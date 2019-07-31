<template>
    <v-app-bar app>
        <Hammock class="logo"/>
        <v-toolbar-title class="title">Nomad Pit Stops</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <v-app-bar-items class="hidden-sm-and-down">

            </v-app-bar-items>-->
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn text v-for="item in menu" :key="item.link" :to="item.link">{{item.title}}</v-btn>
                <v-btn text v-if="!loggedIn" @click="$emmit('login')">LOGIN</v-btn>
                <v-btn text v-else @click="listeners.signout">SIGN OUT</v-btn>
            </v-toolbar-items>
            <v-app-bar-nav-icon class="hidden-md-and-up" @click="$emmit('drawer')"></v-app-bar-nav-icon>
    </v-app-bar>
</template>
<script>
import Vue from 'vue';
import Hammock from '~/static/hammock.svg?inline';
Vue.component('Hammock', Hammock);
export default {
    component: {
        Hammock
    },
    props:['menu', 'loggedIn', 'drawer']
};
</script>
<style scoped>
.logo {
    border-radius: 0;
    height: 100%;
    margin-right: 1rem;
    /* border-radius: 100%; */
    fill: #4aa0d5;
}
header {
    position: fixed;
    width: 100%;
    z-index: 5000;
}
v-toolbar-title {
    color: white;
}
</style>
