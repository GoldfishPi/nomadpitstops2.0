<template>
    <v-card class="pitstops">
        <v-toolbar absolute color="#4AA0D5" dark>
            <v-toolbar-title>
                <h1>Map</h1>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon v-on:click="centerMap">fa-crosshairs</v-icon>
            <v-spacer></v-spacer>
            <v-icon v-on:click="startSelectingPoint">{{icon}}</v-icon>
        </v-toolbar>
        <v-list class="scrooly" three-line>
            <template v-for="(m, index) in markers">
                <v-list-tile :key="index" v-on:click="setFocus($event, m)">
                    <v-list-tile-content>
                        <v-list-tile-title>{{m.name}}</v-list-tile-title>
                        <!-- <v-list-tile-sub-title>{{m.notes}}</v-list-tile-sub-title> -->
                    </v-list-tile-content>
                </v-list-tile>
                <!-- <v-space :key="index"></v-space> -->
            </template>
        </v-list>
    </v-card>
</template>

<script>
export default {
    computed: {
        markers() {
            return this.$store.state.map.markers;
        }
    },
    data() {
        return {
            snackbar: false,
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
        setFocus(e, m) {
            console.log('setting focus', m);
            this.$store.commit('map/setFocus', m.position);
            this.mapZoom = 15;
        },
        startSelectingPoint() {
            if (this.$store.state.map.selectingState === 'standby') {
                this.$store.commit(
                    'snackbar/setSnack',
                    'Select A Point On The Map'
                );
                this.$store.commit('map/setSelectState', 'selecting');
            } else {
                this.$store.commit('map/setSelectState', 'standby');
            }
        },
        centerMap() {
            this.$store.commit(
                'map/setFocus',
                this.$store.state.map.userLocation
            );
            this.$store.commit('map/setZoom', 16);
        }
    }
};
</script>

<style>
.scrooly {
    padding-top: 100px;
    overflow: auto;
    max-height: 100%;
    box-sizing: border-box;
}
</style>
