<template>
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
            <!-- <v-btn to="map" flat color="white">Map</v-btn>
            <v-btn to="blog" flat color="white">Blog</v-btn>-->
        </v-toolbar-items>
        <v-menu class="hidden-md-and-up">
            <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
            <v-list>
                <v-list-tile v-for="item in menu" :key="item.link" :to="item.link">
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-menu>
    </v-toolbar>
</template>

<script>
export default {
    computed: {
        isTop() {
            // return false;
            if (!this.$store.state.nav.defaultLargeNav) return false;
            return this.$store.state.nav.largeNav;
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
            ]
        };
    },
    mounted() {
        // console.log('this lol', this)

        this.checkScroll();
        console.log('state');
        document.addEventListener('scroll', e => {
            this.checkScroll();
        });
    },
    methods: {
        checkScroll() {
            if (
                typeof document.scrollingElement.scrollTop === 'number' &&
                document.scrollingElement.scrollTop > 50
            ) {
                this.$store.commit('nav/setNav', false, 'lol');
            } else {
                this.$store.commit('nav/setNav', true);
            }
            //   console.log('store nav', this.$store.state.nav.largeNav)
        },
        toggleMenu() {
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
                document.addEventListener('click', e => {
                    //   if (this.isOpen) this.toggleMenu();
                });
            }
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
