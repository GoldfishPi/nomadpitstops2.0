<template>
    <div class="pitstops">
        <div class="__card __card-deck cards">
            <div
                class="__card __card-hoverable"
                :key="index"
                v-for="(m, index) in markers"
                v-on:click="setFocus($event, m)"
            >
                <p></p>
                <h2>{{m.name}}</h2>
                <p>{{m.notes}}</p>
                <i>View On Map</i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        markers() {
            return this.$store.state.map.markers;
        }
    },
    methods: {
        setFocus(e, m) {
            console.log('setting focus', m);
            this.$store.commit('map/setFocus', m.position);
            this.mapZoom = 15;
        }
    }
};
</script>

<style>
.pitstops .cards {
    padding: 0.5rem;
    direction: rtl;
    text-align: left;
}
</style>
