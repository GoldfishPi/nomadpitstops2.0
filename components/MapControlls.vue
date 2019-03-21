<template>
    <div class="__card controlls">
        <div class="search">
            <input type="text" ref="places" class="__txt">
            <!-- <img class="search-icon" src="../assets/icons/maps/icons/search.svg" alt="search icon"> -->
        </div>
        <div class="info">
            <p v-if="selectingState === 'selecting'">Select a point on the map</p>
        </div>
        <div class="group">
            <div class="crosshairs" v-on:click="onCenter">
                <img src="../assets/icons/maps/icons/crosshairs.svg" alt>
                <p>Center</p>
            </div>
            <div class="pin" v-on:click="onAdd" v-if="selectingState === 'standby'">
                <img src="../assets/icons/maps/icons/map-pin.svg" alt>
                <p>Add Pitstop</p>
            </div>
            <div class="pin cancel" v-on:click="onCancel" v-if="selectingState != 'standby'">
                <h2 class="__txt-danger">X</h2>
                <p class="__txt-danger">Canncel</p>
            </div>
        </div>
    </div>
</template>

<script>
// import vuetify-google-autocomplete from 'vuetify-google-autocomplete';
export default {
    components: {},
    computed: {
        selectingState() {
            console.log('selecing state', this.$store.state.map.selectingState);
            return this.$store.state.map.selectingState;
        }
    },
    methods: {
        onCenter() {
            this.$store.commit(
                'map/setFocus',
                this.$store.state.map.userLocation
            );
            this.$store.commit('map/setZoom', 16);
        },
        onAdd() {
            this.$store.commit('map/setSelectState', 'selecting');
        },
        onCancel() {
            this.$store.commit('map/setSelectState', 'standby');
        }
    },
    mounted() {
        // console.log('places', this.$refs.places);
        this.$gmapApiPromiseLazy().then(api => {
            console.log('data');
            this.autocomplete = new api.maps.places.Autocomplete(
                this.$refs.places,
                {
                    types: ['geocode']
                }
            );
            this.autocomplete.addListener('place_changed', e => {
                console.log('e', this.autocomplete.getPlace());
                var place = this.autocomplete.getPlace().geometry.location;
                this.$store.commit('map/setFocus', {
                    lng: place.lng(),
                    lat: place.lat()
                });
            });
        });
    }
};
</script>

<style>
.controlls {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.search {
    display: flex;
    align-items: center;
}
.search-icon {
    width: 30px;
    margin-left: 1rem;
    stroke: #4aa0d5;
}
.info p {
    color: #28a745;
    font-weight: bold;
}
.group {
    display: flex;
    align-items: center;
}
.crosshairs {
    margin-right: 2rem;
    display: flex;
    flex-direction: column;
    cursor: pointer;
}
.crosshairs p {
    transition: all 0.5s;
    border-bottom: 2px solid #4aa0d5;
    padding: 0 3px;
}
.crosshairs:hover p {
    padding: 0 7px;
}
.pin {
    display: flex;
    flex-direction: column;
    cursor: pointer;
}
.pin img {
    /* width: 30px; */
}
.pin p {
    transition: all 0.5s;
    border-bottom: 2px solid #4aa0d5;
    padding: 0 3px;
}
.pin:hover p {
    padding: 0 7px;
}
.cancel {
    font-size: 2rem;
    text-align: center;
}
.cancel p {
    border-bottom-color: #e15562;
}
@media screen and (max-width: 1100px) {
    .controlls {
        flex-direction: column-reverse;
    }
}
@media screen and (max-width: 2000px) {
    .info p {
        font-size: 1rem;
    }
}
</style>
