<template>
    <v-card class="pitstops">
        <MapControlls/>
        <div class="scrooly">
            <v-list three-line>
                <template v-for="(m, index) in markers">
                    <v-list-tile :key="index" v-on:click="setFocus($event, m)">
                        <v-list-tile-content>
                            <v-list-tile-title>{{m.name}}</v-list-tile-title>
                            <v-list-tile-sub-title>{{m.notes}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </div>
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
    height: 91.5vh;
}
.scrooly {
    padding-top: 60px;
    overflow: auto;
    max-height: 100%;
    box-sizing: border-box;
    direction: rtl;
}
</style>
