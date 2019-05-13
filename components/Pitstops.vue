<template>
    <v-expansion-panel inset>
        <v-expansion-panel-content v-for="(m, index) in markers" :key="index">
            <template v-slot:header>
                <div>{{m.name}}</div>
            </template>
            <v-card>
                <v-card-text>{{m.notes}}</v-card-text>
                <v-btn icon v-on:click="setFocus($event, m)">
                    <v-icon>fa-map</v-icon>
                </v-btn>
            </v-card>
        </v-expansion-panel-content>
    </v-expansion-panel>
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
                lng: m.position.lng,
                lat: m.position.lat
            });
            this.mapZoom = 15;
        }
    }
    //  <!-- <v-card class="pitstops">
    //     <div class="scrolly">
    //         <MapControlls/>
    //         <div class="scrooly">
    //             <!-- <v-list three-line>
    //             <template v-for="(m, index) in markers">
    //                 <v-list-tile :key="index" v-on:click="setFocus($event, m)">
    //                     <v-list-tile-content>
    //                         <v-list-tile-title>{{m.name}}</v-list-tile-title>
    //                         <v-list-sub-title>
    //                             <v-layout>
    //                                 <v-flex align-self-start>
    //                                     <v-icon>fas fa-map</v-icon>
    //                                     <v-icon>fas fa-globe</v-icon>
    //                                 </v-flex>
    //                             </v-layout>
    //                         </v-list-sub-title>
    //                         <v-list-tile-sub-title>{{m.notes}}</v-list-tile-sub-title>
    //                     </v-list-tile-content>
    //                 </v-list-tile>
    //             </template>
    //             </v-list>-->
    //         </div>
    //     </div>
    // </v-card> -->
};
</script>

<style>
.pitstops {
    /* position: relative; */
    /* height: 100%; */
    display: flex;
    flex-direction: row;
}
.scrolly {
    position: relative;
}
/* .scrooly {
    padding-top: 60px;
    overflow: auto;
    max-height: 100%;
    box-sizing: border-box;
    direction: rtl;
} */
</style>
