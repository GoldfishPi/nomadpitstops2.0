<template>
    <div>
        <v-container>
            <div class="pitstops">
                <v-card v-for="p of pitstops" :key="p.id" :to="`pitstops/${p.id}`">
                    <v-img 
                        v-if="p.images && p.images.length"
                        :src="p.images[0].link"
                        height="400"
                    ></v-img>
                    <v-card-title>{{p.name}}</v-card-title>
                    <v-card-text>{{p.notes}}</v-card-text>
                </v-card>
            </div>
        </v-container>
        <PitstopDialog 
            :active="dialog" 
            @close="dialog = !dialog"
            @create="createPitstop($event)"
            ></PitstopDialog>
        <div class="add">
            <v-btn @click="dialog = true" color="primary" fab large>
                <v-icon>fas fa-plus</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script lange="ts">
import Vue from "vue";
import PitstopDialog from "../../components/PitstopDialog";
export default Vue.extend({
    components: {
        PitstopDialog
    },
    data() {
        return {
            dialog: false
        };
    },
    computed: {
        pitstops() {
            return this.$store.state.pitstops.pitstops;
        }
    },
    async asyncData ({store}) {
        await store.dispatch('pitstops/GET_PITSTOPS');
    },
    head() {
        return {
            title: 'Nomad Pit Stops | Pit Stops'
        };
    },
    methods: {
        createPitstop(p) {
            console.log('pitstop lol', p);
        }
    }
});

</script>

<style scoped>
.add {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
}
.pitstops {
    display:grid;
    grid-template-columns:repeat(auto-fit, minmax(450px, 1fr));
    grid-gap: 1rem;
}
.map-container {
    display: grid;
    grid-template-columns: 1fr 3fr;
    /* grid-template-rows: 4rem 10vh 55vh; */
    grid-template-rows: 90vh;
    /* grid-gap: 1.3rem; */
    /* margin: 1.3rem; */
    height: 100%;
}
</style>
