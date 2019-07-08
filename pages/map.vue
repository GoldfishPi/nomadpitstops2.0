<template>
    <v-layout fill-height>
        <v-flex xs12 style="height:100%;">
            <Map class="pm-6"/>
        </v-flex>
        <v-navigation-drawer absolute v-model="drawer">
            <MapControlls/>
            <Pitstops/>
        </v-navigation-drawer>
    </v-layout>
</template>

<script>
import Map from '../components/Map';
import Pitstops from '@/components/Pitstops';
import MapControlls from '@/components/MapControlls';
export default {
    components: {
        Map,
        Pitstops,
        MapControlls
    },
    computed: {
        markers() {
            return this.$store.state.map.markers;
        },
        focus() {
            return this.$store.state.map.focus;
        }
    },
    data() {
        return {
            drawer: true
        };
    },
    mounted() {
        this.$store.dispatch('map/getMarkers');
        this.$store.dispatch('map/getUserLocation');
    },
    async asyncData(context) {
        return context.store.dispatch('map/getMarkers');
    },
    head() {
        return {
            title: 'Nomad Pit Stops | Map'
        };
    }
};
</script>
    
<style>
.map-container {
    display: grid;
    grid-template-columns: 1fr 3fr;
    /* grid-template-rows: 4rem 10vh 55vh; */
    grid-template-rows: 90vh;
    /* grid-gap: 1.3rem; */
    /* margin: 1.3rem; */
    height: 100%;
}
/* .map-container .heading {
    grid-row-start: 1;
    grid-row-end: 3;
    grid-column: 1;
}
.controlls {
    grid-row-start: 1;
    grid-row-end: 3;
}
.map {
    padding: 0;
    grid-row: 3;
    grid-column: 2;
}
.pitstops {
    grid-column: 1;
    grid-row-start: 1;
    grid-row-end: 4;
} */
/* @media screen and (max-width: 1100px) {
    .map-container {
        grid-template-columns: 1fr;
        grid-template-rows: 4rem 200px 60vh auto;
    }
    .cards {
        grid-row: 2;
        grid-column: 1;
    }
    .map {
        grid-column: 1;
    }
    .controlls {
        grid-row-start: 2;
        grid-row-end: 3;
        grid-column: 1;
    }
    .pitstops {
        grid-column: 1;
        grid-row: 4;
    }
} */
</style>
