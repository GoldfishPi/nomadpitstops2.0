<template>
    <v-card class="map" v-bind:class="selecting">
        <GmapMap
            :center="focus"
            :zoom="mapZoom"
            map-type-id="terrain"
            v-on:click="onSelect($event)"
            :options="mapOptions"
        >
            <GmapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                :draggable="true"
                @click="center=m.position"
            />
            <GmapMarker
                v-if="selecting === 'selected'"
                :position="selectMarker"
                :clickable="true"
                :draggable="true"
            />
        </GmapMap>
        <div class="__card add-controlls __card-borderless">
            <div>
                <input type="text" class="__txt text" placeholder="Name" v-model="name">
            </div>
            <div>
                <textarea
                    name
                    id
                    cols="30"
                    rows="10"
                    class="__txt text"
                    placeholder="Notes"
                    v-model="notes"
                ></textarea>
            </div>
            <div>
                <h3 class="speed">Internet Speed</h3>
                <input type="range" min="0" max="5" v-model="speed">
            </div>
            <div class="__btn-group">
                <input
                    type="button"
                    class="__btn __btn-light __btn-border"
                    value="Select Other Point"
                    v-on:click="onClose"
                >
                <input type="button" class="__btn __btn-primary" value="Save" v-on:click="onSave">
            </div>
        </div>
    </v-card>
</template>

<script>
export default {
    computed: {
        markers() {
            return this.$store.state.map.markers;
        },
        focus() {
            return this.$store.state.map.focus;
        },
        mapZoom() {
            return this.$store.state.map.zoom;
        },
        selecting() {
            return this.$store.state.map.selectingState;
        }
    },
    data() {
        return {
            selectMarker: {
                lat: 0,
                lng: 0
            },
            name: '',
            notes: '',
            speed: 0,
            mapOptions: {
                disableDefaultUI: true
            }
        };
    },
    methods: {
        onSelect(e) {
            if (this.$store.state.map.selectingState === 'selecting') {
                this.selectMarker = {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng()
                };
                console.log('e', e);
                this.$store.commit('map/setFocus', this.selectMarker);
                this.$store.commit('map/setSelectState', 'selected');
                this.$store.commit('map/setZoom', 18);
            }
        },
        onCancel() {
            this.$store.commit('map/setSelectState', 'standby');
        },
        onClose() {
            this.$store.commit('map/setSelectState', 'selecting');
        },
        onSave() {
            this.$store.dispatch('map/addMarker', {
                name: this.name,
                notes: this.notes,
                connection: this.speed,
                location: this.selectMarker,
                longitude: this.selectMarker.lng,
                latitude: this.selectMarker.lat
            });
            this.$store.commit('map/setSelectState', 'standby');
        }
    }
};
</script>

<style>
.close {
    color: grey;
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: pointer;
}
.map {
    position: relative;
    overflow: hidden;
}
.vue-map-container {
    transition: all 0.5s;
    width: 100%;
    height: 100%;
}
.selected .vue-map-container {
    width: 50%;
    margin-left: 50%;
}
.selecting * {
    cursor: crosshair;
}
.add-controlls {
    transition: all 0.3s;
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    left: -100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.add-controlls .text {
    width: 100%;
}
.selected .add-controlls {
    left: 0%;
}
.speed {
    color: grey;
    font-size: 1.2rem;
}
@media screen and (max-width: 900px) {
    .add-controlls {
        width: 100%;
    }
}
</style>
