<template>
    <div>
        <v-btn 
            color="primary" 
            fab
            to="/pitstops"
            class="back-btn">
            <v-icon>fa fa-arrow-left</v-icon>
        </v-btn>
        <v-container fill-height fluid>
            <!-- <h1>Pitstop Name</h1> -->
            <v-card class="page-card" width="100%" flat outlined>
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
                                   class="hidden-sm-and-down"
                                   :hide-toolbar="true" 
                                   :loc="[pitstop.longitude, pitstop.latitude]" 
                                   >
                        </Map>

                    </v-flex>
                    <v-flex xs12 md5>
                        <v-img 
                            v-if="pitstop.images && pitstop.images.length"
                            :src="pitstop.images[0].link"
                            height="300"
                            ></v-img>
                        <v-container>
                            <v-layout align-center>
                                <v-flex xs1>
                                    <v-icon>fas fa-wifi</v-icon>
                                </v-flex>
                                <v-flex>
                                    <v-progress-linear 
                                        height="20"
                                        :value="connection"
                                        bottom
                                        rounded
                                        ></v-progress-linear>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-card flat >
                            <v-card-title class="hidden-sm-and-down"><h1 class="headline">{{pitstop.name}}</h1></v-card-title>
                            <v-card-text>
                                {{pitstop.notes}}
                            </v-card-text>
                        </v-card>

                        <v-card flat>
                            <v-card-text>
                                <!-- <v-file-input 
                                    label="Upload Pitstop Image"  
                                    prepend-icon="mdi-camera"
                                    @change="imageUpload($event)"
                                    accept="image/*"
                                    ></v-file-input> -->
                                <v-text-field dense label="Add a public comment" v-model="note"></v-text-field>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" text @click="addNote()">Comment</v-btn>
                            </v-card-actions>
                        </v-card>

                        <CommentList :comments="pitstop.comments"/>

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
                            ></Map>
                    </v-flex>
                </v-layout>
            </v-dialog>

        </v-container>
    </div>
</template>

<script lang="ts">
import Map from '../../components/helpers/Map/index.vue';
import CommentList from "../../components/helpers/CommentList/index.vue";
import Vue from 'vue';
export default Vue.extend({
    components: {
        Map,
        CommentList
    },
    computed: {
        notes() {
            return [];
            return this.$store.getters['pitstops/NOTES']
                .find(n => n.pitstopId === this.$route.params.id).notes;
        },
        connection() {
            return this.pitstop.connection * 10;
        }
    },
    data: () => ({
        fullscreen:false,
        doc:{},
        note:'',
        pitstop:{
            connection:0,
            images:[],
            name:'',
            notes:'',
            comments:[],
            id:''
        },
    }),
    async asyncData({params, app, store, route}) {
        await store.dispatch('pitstops/GET_PITSTOP', params.id);
        const ps = store.state.pitstops.pitstops
            .find(p => p.id == route.params.id);
        return {
            pitstop:ps
        }
    },
    methods: {
        async addNote() {
            await this.$store
                .dispatch('pitstops/ADD_COMMENT', {
                    comment:this.note, 
                    id:this.$route.params.id
                });
            this.pitstop = await this.$store
                .dispatch('pitstops/GET_PITSTOP', this.pitstop.id);
            this.note = '';
        },
        imageUpload(file) {
            this.$store
                .dispatch('pitstops/ADD_IMAGE', {
                    file,
                    id: this.$route.params.id
                });
        }
    },
    head() {
        const pitstop = this.pitstop;

        const images = pitstop.images ? pitstop.images : [];
        const link = images[0] ? images[0].link : '';

        const name = pitstop.name;
        const description = pitstop.notes;

        return {
            title: `Nomad Pit Stops | Pit Stops | ${name}`,
            meta: [
                {
                    hid: 'og:image',
                    name: 'og:image',
                    content: link
                },
                {
                    hid: 'twitter:image',
                    name: 'twitter:image',
                    content:link
                },
                {
                    hid: 'description',
                    name: 'description',
                    content:description
                },
                {
                    hid: 'og:description',
                    name: 'og:description',
                    content: description
                },
                {
                    hid: 'twitter:title',
                    name: 'twitter:title',
                    content: name
                },
                {
                    hid: 'twitter:card',
                    name: 'twitter:card',
                    content: 'website'
                },
                {
                    hid: 'og:url',
                    name: 'og:url',
                    content: process.env.siteUrl + this.$route.path
                },
                {
                    hid: 'og:title',
                    name: 'og:title',
                    content: name
                },

            ]
        }
    }
});
</script>

<style scoped>
.map {
    height: 100%;
    min-height:80vh;
}
.page-card {
    min-height: 80vh;
}
.back-btn {
    margin-top:1rem;
    margin-left:1rem;
}
</style>
