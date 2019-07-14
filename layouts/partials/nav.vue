<template>
    <div>
        <v-toolbar app color="#454553" dark>
            <img class="logo" src="./../../assets/logo.png" alt>
            <v-toolbar-title>Nomad Pit Stops</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn
                    flat
                    v-for="item in menu"
                    :key="item.link"
                    :to="item.link"
                    color="white"
                >{{item.title}}</v-btn>
            </v-toolbar-items>
            <v-menu class="hidden-md-and-up">
                <v-toolbar-side-icon slot="activator" v-on:click="drawer = !drawer"></v-toolbar-side-icon>
            </v-menu>
        </v-toolbar>
        <v-navigation-drawer app v-model="drawer" dark right class="hidden-md-and-up">
            <v-list>
                <v-list-tile v-for="item in menu" :key="item.link" :to="item.link">
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
                    link: '/'
                },
                {
                    title: 'Map',
                    link: '/map'
                },
                {
                    title: 'Blog',
                    link: '/blog'
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
    /* border-radius: 100%; */
}
v-toolbar-title {
    color: white;
}
</style>
