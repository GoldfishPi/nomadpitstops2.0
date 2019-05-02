<template>
    <v-card class="pitstops">
        <MapControlls/>
        <v-list class="scrooly" three-line>
            <template v-for="(m, index) in markers">
                <v-list-tile :key="index" v-on:click="setFocus($event, m)">
                    <v-list-tile-content>
                        <v-list-tile-title>{{m.title}}</v-list-tile-title>
                        <!-- <v-list-tile-sub-title>{{m.notes}}</v-list-tile-sub-title> -->
                    </v-list-tile-content>
                </v-list-tile>
                <!-- <v-space :key="index"></v-space> -->
            </template>
        </v-list>
    </v-card>
</template>

<script>
import MapControlls from './MapControlls';
export default {
    components: {
        MapControlls
    },
    computed: {
        markers() {
            return this.$store.state.map.markers;
        }
    },
    data() {
        return {
            snackbar: false,
            icon: 'fa-plus'
        };
    },

    methods: {
        setFocus(e, m) {
            console.log('setting focus', m);
            this.$store.commit('map/setFocus', {
                lng: m.loc.longitude,
                lat: m.loc.latitude
            });
            this.mapZoom = 15;
        }
    }
};
</script>

<style>
.pitstops {
    height: 100%;
}
.scrooly {
    padding-top: 100px;
    overflow: auto;
    max-height: 100%;
    box-sizing: border-box;
}
</style>
