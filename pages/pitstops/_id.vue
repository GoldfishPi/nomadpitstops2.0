<template>
        <v-container fill-height fluid>
            <!-- <h1>Pitstop Name</h1> -->
            <v-card height="100%" width="100%" flat outlined>
                <v-layout fill-height justify-space-between wrap>
                    <v-flex xs12 md7>
                        <v-toolbar flat class="hidden-md-and-up">
                            <v-toolbar-title>{{pitstop.name}}</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn icon @click="fullscreen = true">
                                <v-icon>fas fa-expand</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon>fas fa-directions</v-icon>
                            </v-btn>
                        </v-toolbar>

                        <Map 
                            :loc="[pitstop.longitude, pitstop.latitude]" 
                            @fullscreen="fullscreen = true"/></v-flex>
                        <v-flex xs12 md5>
                            <v-card flat class="hidden-sm-and-down">
                                <v-card-title><h1 class="headline">{{pitstop.name}}</h1></v-card-title>
                                <v-card-text>{{pitstop.notes}}</v-card-text>
                            </v-card>
                            <v-card flat>
                                <v-card-text>
                                    <v-textarea outlined label="Field Notes" v-model="note"></v-textarea>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" text @click="addNote()">Add</v-btn>
                                </v-card-actions>
                            </v-card>
                            <v-list three-line>
                                <v-list-item v-for="c in pitstop.comments">
                                    <v-list-item-avatar>
                                        <v-img
                                             src="https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif"
                                             ></v-img>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            {{c.user.displayName}} 
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            {{c.text}}
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-flex>
                </v-layout>
            </v-card>
            <v-dialog fullscreen hide-overlay transition="dialog-bottom-transition" v-model="fullscreen">
                <v-layout fill-height column>
                    <v-flex xs1>
                        <v-toolbar extended color="primary">
                            <v-btn text class="white--text" @click="fullscreen = false">close</v-btn>
                        </v-toolbar>
                    </v-flex>
                <v-flex xs11>
                    <Map 
                        :hide-toolbar="true" 
                        :loc="[pitstop.longitude, pitstop.latitude]" 
                        @fullscreen=""></Map>
                </v-flex>
                </v-layout>
            </v-dialog>

        </v-container>
</template>

<script lang="ts">
import Map from '~/components/Map';
import Vue from 'vue';
export default Vue.extend({
    components: {
        Map
    },
    computed: {
        pitstop() {
            return this.$store.state.pitstops.pitstops
                .find(p => p.id == this.$route.params.id);
        },
        notes() {
            return [];
            return this.$store.getters['pitstops/NOTES']
                .find(n => n.pitstopId === this.$route.params.id).notes;
        },
    },
    data: () => ({
        fullscreen:false,
        doc:{},
        note:'',
    }),
    async asyncData({params, app, store}) {
        return await store.dispatch('pitstops/GET_PITSTOP', params.id);
    },
    methods: {
        async addNote() {
            this.$store
                .dispatch('pitstops/ADD_COMMENT', {
                    comment:this.note, 
                    id:this.$route.params.id
                });
        }
    },
    head() {
        return {
            title: `Nomad Pit Stops | Pit Stops | ${this.pitstop.name}`
        }
    }
});
</script>

<style scoped>
.map {
    height: 100%;
}
.map-wrap {
    /* margin-bottom: 0.5rem; */
    /* margin-right: 0.5rem; */
}
</style>
