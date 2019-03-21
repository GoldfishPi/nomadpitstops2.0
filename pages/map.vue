<template>
    <div>
        <div class="map-container">
            <Map/>
            <Pitstops/>
            <MapControlls/>
        </div>
    </div>
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
    mounted() {
        this.$store.commit('nav/setNav', false);
        this.$store.commit('nav/setDefault', false);
        this.$store.dispatch('map/getMarkers');
        this.$store.dispatch('map/getUserLocation');
    }
};
</script>
    
<style>
.map-container {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: 15vh 65vh;
    grid-gap: 1.3rem;
    margin: 1.3rem;
}
.map {
    padding: 0;
    grid-row: 2;
    grid-column: 2;
}
.pitstops {
    grid-row-start: 1;
    grid-row-end: 3;
}
@media screen and (max-width: 1100px) {
    .map-container {
        grid-template-columns: 1fr;
        grid-template-rows: 200px 60vh auto;
    }
    .cards {
        grid-row: 3;
    }
    .map {
        grid-column: 1;
    }
    .pitstops {
        grid-column: 1;
        grid-row: 3;
    }
}
</style>
