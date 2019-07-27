<template>
    <div flat class="map" v-bind:class="selecting">
        <v-toolbar class="hidden-md-and-up">
            <v-toolbar-title>Pit Stop Name</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="dialog = !dialog">
                <v-icon>fas fa-expand</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>fas fa-directions</v-icon>
            </v-btn>
        </v-toolbar>
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
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar>
                    <v-btn @click="dialog = !dialog" icon>
                        <v-icon>fas fa-times</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-layout fill-height>
                    <v-flex>
                        <div class="fullscreen-map">
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
                        </div>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import MapControlls from './MapControlls';
export default {
    components: {
        MapControlls
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
            },
            dialog: false
        };
    },
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
.fullscreen-map {
    height: 94vh;
}
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
    height: 100%;
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
