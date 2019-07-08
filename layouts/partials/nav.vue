<template>
    <div>
        <v-app-bar app >
            <Hammock class="logo"/>
            <!-- <img class="logo" src="./../../assets/logo.png" alt> -->
            <v-toolbar-title class="title">Nomad Pit Stops</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-app-bar-items class="hidden-sm-and-down">
                
            </v-app-bar-items> -->
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn
                    text
                    v-for="item in menu"
                    :key="item.link"
                    :to="item.link"
                >{{item.title}}</v-btn>
            </v-toolbar-items>
            <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-app-bar-nav-icon>

        </v-app-bar>
        <v-navigation-drawer app v-model="drawer" right class="hidden-md-and-up">
            
            <v-list-item v-for="item in menu" :key="item.link" nuxt :to="item.link">
                <v-list-item-icon><v-icon>{{item.icon}}</v-icon></v-list-item-icon>
                <v-list-item-content class="title">
                    <v-list-item-title>
                        {{item.title}}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            
        </v-navigation-drawer>
    </div>
</template>

<script>
import { auth } from '~/plugins/firebase.js';
import Hammock from '~/static/hammock.svg?inline';

export default {
    components: {
        Hammock
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.loggedIn;
        }
    },
    data() {
        return {
            isOpen: false,
            menu: [
                {
                    title: 'Home',
                    link: '/',
                    icon:'fas fa-home'
                },
                // {
                //     title: 'Map',
                //     link: '/map',
                //     icon:'fas fa-map'
                // },
                {
                    title: 'Blog',
                    link: '/blog',
                    icon:'fas fa-book-open'
                }
            ],
            loginOverride: false,
            drawer: false
        };
    },
    mounted() {},
    methods: {
        logOut() {
            auth.signOut();
        }
    }
};
</script>

<style scoped>
header {
    position: fixed;
    width: 100%;
    z-index: 5000;
}
.logo {
    border-radius: 0;
    height: 100%;
    margin-right: 1rem;
    /* border-radius: 100%; */
    fill: #4AA0D5;
}
v-toolbar-title {
    color: white;
}
</style>
