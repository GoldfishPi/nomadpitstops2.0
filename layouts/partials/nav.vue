<template>
    <v-app-bar app>
        <nuxt-link to="/" class="logo" >
            <Hammock />
        </nuxt-link>
        <nuxt-link to="/">
            <v-toolbar-title class="title">Nomad Pit Stops</v-toolbar-title>
        </nuxt-link>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn text v-for="item in menu" :key="item.link" :to="item.link">{{item.title}}</v-btn>
            <v-btn text v-if="!loggedIn" @click="$emit('login')">LOGIN</v-btn>
            <v-btn text v-else @click="$emit('signout')">SIGN OUT</v-btn>
        </v-toolbar-items>
        <v-app-bar-nav-icon class="hidden-md-and-up" @click="$emit('drawer')"></v-app-bar-nav-icon>
    </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import Hammock from '~/static/hammock.svg?inline';
Vue.component('Hammock', Hammock);
export default Vue.extend({
    props:['menu', 'loggedIn', 'drawer'],
    component: {
        Hammock
    },
    methods:{

    }
});
</script>
<style scoped lang="scss">
.logo {
    border-radius: 0;
    height: 100%;
    margin-right: 1rem;
    /* border-radius: 100%; */
    fill: #4aa0d5;
    svg {
        height:100%;
    }
}
header {
    position: fixed;
    width: 100%;
    z-index: 5000;
}
v-toolbar-title {
    color: white;
    
}
a {
    text-decoration:none;
}
.title {
    color:initial;
    text-decoration:none;
}
</style>
