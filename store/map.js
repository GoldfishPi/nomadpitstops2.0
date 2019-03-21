import Axios from "axios";

export const state = () => ({
    focus: {
        lng: 0,
        lat: 0,
    },
    focusSet: false,
    userLocation: {
        lng: 0,
        lat: 0,
    },
    markers: [],
    zoom: 13,
    selectingState: 'standby'
});

export const mutations = {
    setFocus(state, position) {
        state.focus = position
    },
    setUserLocation(state, position) {
        state.userLocation = position;
        if (!state.focusSet) {
            state.focus = position;
            state.focusSet = true;
        }
        // state.getMarkersRadius();
    },
    setMarkers(state, markers) {
        state.markers = markers;
    },
    setZoom(state, zoom) {
        state.zoom = zoom;
    },
    setSelectState(state, selectingState) {
        state.selectingState = selectingState;
    },
    addMarker(state, marker) {
        state.markers.unshift(marker);
    }
};
export const actions = {
    getMarkers(context) {
        if (this.state.map.markers.length) return;
        this.$axios.get('/pitstops')
            .then(data => {
                data = data.data.map(marker => {
                    return {
                        name: marker.name,
                        notes: marker.notes,
                        position: {
                            lng: marker.longitude,
                            lat: marker.latitude,
                        },
                        connection: marker.connection
                    }
                });
                context.commit('setMarkers', data);
            })

    },
    getMarkersRadius(context, position) {
        var position = this.state.map.userLocation;
        // console.log('getting marker radius', this.state)
        this.$axios.post('/pitstops/radius', {
            longitude: position.lng,
            latitude: position.lat
        })
            .then(data => {
                data = data.data.map(marker => {
                    return {
                        name: marker.name,
                        notes: marker.notes,
                        position: {
                            lng: marker.longitude,
                            lat: marker.latitude,
                        },
                        connection: marker.connection
                    }
                });
                context.commit('setMarkers', data);
            })
    },
    getUserLocation(context) {
        if (window && window.localStorage
            && window.localStorage.getItem('userLocation')) {
            context.commit('setUserLocation', JSON.parse(
                window.localStorage.getItem('userLocation')
            ));
            context.dispatch('getMarkersRadius')
        }
        if (navigator.geolocation.getCurrentPosition) {
            navigator.geolocation.getCurrentPosition(position => {
                context.commit('setUserLocation', {
                    lng: position.coords.longitude,
                    lat: position.coords.latitude
                });
                if (window && window.localStorage) {
                    window.localStorage.setItem('userLocation', JSON.stringify({
                        lng: position.coords.longitude,
                        lat: position.coords.latitude
                    }));
                }
            });
            context.dispatch('getMarkersRadius')
        }
    },
    addMarker(context, marker) {
        // console.log('context', )
        context.commit('addMarker', marker);
        this.$axios.post('/pitstops', marker);
    }
}