<template>
    <div>
        <v-container>
            <div class="pitstops">
                <v-card v-for="p of pitstops" :key="p.id" :to="`pitstops/${p.id}`">
                    <v-img 
                        :src="p.images[1]"
                    ></v-img>
                    <v-card-title>{{p.name}}</v-card-title>
                    <v-card-text>{{p.notes}}</v-card-text>
                </v-card>
            </div>
        </v-container>
        <div class="add">
            <v-btn @click="dialog = true" color="primary" fab large>
                <v-icon>fas fa-plus</v-icon>
            </v-btn>
        </div>
        <v-dialog fullscreen v-model="dialog" hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon @click="dialog = !dialog">
                        <v-icon>fas fa-times</v-icon>
                    </v-btn>
                    <v-toolbar-title>Add Pit Stop</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn text @click="dialog = !dialog">Save</v-btn>
                </v-toolbar>
                <v-card-title>helo</v-card-title>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
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
    }
};
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
