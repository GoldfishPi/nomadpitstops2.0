<template>
    <div>
        <v-container>
            <v-layout column>
                <v-flex class="pitstop-card" v-for="(p, i) of pitstops" :key="i">
                    <v-card flat outlined :to="`pitstops/${p.id}`">
                        <v-layout align-center>
                            <v-flex xs11>
                                <v-card-title>{{p.name}}</v-card-title>
                            </v-flex>
                            <v-flex>
                                <v-card-actions>
                                    <v-btn icon :to="`pitstops/${p.id}`">
                                        <v-icon>fas fa-angle-right</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
            </v-layout>
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
    
<style>
.add {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
}
.pitstop-card {
    margin-bottom: 0.5rem;
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
