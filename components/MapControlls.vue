<template>
    <v-toolbar color="#4AA0D5" dark>
        <v-toolbar-title>
            <h1>Map</h1>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon v-on:click="centerMap">fa-crosshairs</v-icon>
        <v-spacer></v-spacer>
        <v-icon v-on:click="startSelectingPoint()">{{icon}}</v-icon>
    </v-toolbar>
</template>

<script>
// import vuetify-google-autocomplete from 'vuetify-google-autocomplete';
export default {
    data() {
        return {
            icon: 'fa-plus'
        };
    },
    mounted() {
        this.$store.watch(
            state => state.map.selectingState,
            () => {
                if (this.$store.state.map.selectingState != 'standby') {
                    this.icon = 'fa-times';
                } else {
                    this.icon = 'fa-plus';
                }
            }
        );
    },
    methods: {
        centerMap() {
            this.$store.commit(
                'map/setFocus',
                this.$store.state.map.userLocation
            );
            this.$store.commit('map/setZoom', 16);
        },
        startSelectingPoint() {
            if (this.$store.state.auth.loggedIn) {
                if (this.$store.state.map.selectingState === 'standby') {
                    this.$store.commit(
                        'snackbar/setSnack',
                        'Select A Point On The Map'
                    );
                    this.$store.commit('map/setSelectState', 'selecting');
                } else {
                    this.$store.commit('map/setSelectState', 'standby');
                }
            } else {
                this.$store.commit('login/setActive', true);
            }
        }
    }
};
</script>

<style>
</style>
