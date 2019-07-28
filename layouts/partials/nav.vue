<template functional>
    <v-app-bar app>
        <slot class="logo"></slot>
        <v-toolbar-title class="title">Nomad Pit Stops</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <v-app-bar-items class="hidden-sm-and-down">

            </v-app-bar-items>-->
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn text v-for="item in props.menu" :key="item.link" :to="item.link">{{item.title}}</v-btn>
                <v-btn text v-if="!props.loggedIn" @click="listeners.login">LOGIN</v-btn>
                <v-btn text v-else @click="listeners.signout">SIGN OUT</v-btn>
            </v-toolbar-items>
            <v-app-bar-nav-icon class="hidden-md-and-up" @click="listeners.drawer"></v-app-bar-nav-icon>
    </v-app-bar>
</template>


<style scoped>
header {
    position: fixed;
    width: 100%;
    z-index: 5000;
}
v-toolbar-title {
    color: white;
}
</style>
