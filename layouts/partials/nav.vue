<template functional>
    <div>
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
                <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-app-bar-nav-icon>
        </v-app-bar>
        <v-navigation-drawer app v-model="drawer" right class="hidden-md-and-up">
            <v-list-item v-for="item in props.menu" :key="item.link" nuxt :to="item.link">
                <v-list-item-icon>
                    <v-icon>{{item.icon}}</v-icon>
                </v-list-item-icon>
                <v-list-item-content class="title">
                    <v-list-item-title>{{item.title}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-navigation-drawer>
        </v-app-bar>
    </div>
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
