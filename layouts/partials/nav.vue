<template>
    <div>
        <v-app-bar dark  color="#454553">
            <img class="logo" src="./../../assets/logo.png" alt>
            <v-app-bar-title class="title">Nomad Pit Stops</v-app-bar-title>
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
            
            <v-menu class="hidden-md-and-up">
                <v-toolbar-side-icon slot="activator" v-on:click="drawer = !drawer"></v-toolbar-side-icon>
            </v-menu>
        </v-app-bar>
        <v-navigation-drawer app v-model="drawer" dark right class="hidden-md-and-up">
            <v-list>
                <v-list-tile v-for="item in menu" :key="item.link" nuxt :to="item.link">
                    <v-list-tile-action v-if="item.icon"><v-icon>{{item.icon}}</v-icon></v-list-tile-action>
                    <v-list-tile-title>{{item.title}}</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import { auth } from '~/plugins/firebase.js';

export default {
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
        openLoginDialog() {
            console.log('lololol', this.$firebase);
            this.$store.commit('login/setActive', true);
        },
        logOut() {
            auth.signOut();
        }
    }
};
</script>

<style>
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
}
v-toolbar-title {
    color: white;
}
</style>
