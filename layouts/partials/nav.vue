<template>
    <header>
        <nuxt-link to="/">
            <img src="./../../assets/logo.png" class="logo" :class="[isTop ? '': 'square']">
        </nuxt-link>

        <nav :class="[isTop ? 'tall': '']">
            <ul class="nav-ul" :class="[isOpen ? 'open': '']">
                <li>
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/map">Map</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/blog">Blog</nuxt-link>
                </li>
                <!-- <li>
          <nuxt-link to="about">About</nuxt-link>
                </li>-->
                <li>
                    <!-- <nuxt-link to="about">Login</nuxt-link> -->
                </li>
            </ul>
            <div class="hamburger" v-on:click="toggleMenu">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="close-ghost" :class="[isOpen ? 'active': '']" v-on:click="toggleMenu"></div>
        </nav>
    </header>
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
            isOpen: false
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
header .logo {
    transition: all 0.4s;
    position: absolute;
    left: auto;
    right: auto;
    width: 10em;
    height: 10em;
    border-radius: 100%;
    margin-top: 1em;
    margin-left: 2em;
}
header .logo.square {
    border-radius: 0;
    width: 5em;
    height: 5em;
    margin: 0;
}
header nav {
    transition: height 0.4s;
    height: 5rem;
    background-color: #454553;
    display: grid;
    justify-content: end;
    /* border-bottom: 5px solid #4aa0d5; */
}
header nav.tall {
    height: 8.5rem;
    border-bottom: none;
}
header nav ul {
    display: flex;
    list-style-type: none;
}
header nav ul li {
    height: 100%;
    /* padding: 1em; */
    /* padding-left: 1.5em; */
    /* margin-right: 1em; */
    text-decoration: none;
    background-color: #4aa0d5;
    display: grid;
    align-content: center;
    transition: background-color 0.3s;
}
header nav ul li:hover {
    background-color: #454553;
}
header nav ul li a {
    transition: all 0.4s;
    text-decoration: none;
    font-size: 1.2em;
    color: white;
    padding: 1rem;
    /* font-weight: bolder; */
}
header nav.tall ul li a {
    font-size: 1.7em;
}
.hamburger {
    top: 5px;
    transition: all 0.3s;
    display: none;
    visibility: hidden;
}
.hamburger div {
    transition: all 0.3s;
    background-color: #4aa0d5;
    width: 50px;
    height: 10px;
    margin: 10px;
}
.close-ghost {
    z-index: 3000;
    position: absolute;
    /* background-color: red; */
    width: 50%;
    height: 100vh;
    opacity: 0.5;
    left: -100%;
}
.close-ghost.active {
    left: 0%;
}
header nav.tall .hamburger {
    top: 10px;
}
header nav.tall .hamburger div {
    width: 75px;
    height: 15px;
    margin: 15px;
}

@media screen and (max-width: 800px) {
    header nav {
        display: block;
    }
    header nav ul {
        z-index: 3000;
        transition: right 0.5s;
        display: block;
        position: absolute;
        background-color: #454553;
        height: 100vh;
        width: 50%;
        padding-left: 0;
        right: -100%;
    }
    header nav ul.open {
        right: 0%;
    }
    header nav ul li {
        height: 100px;
        width: 100%;
    }
    header nav ul li a {
        font-size: 2rem;
    }
    header nav.tall ul li a {
        font-size: 2rem;
    }
    .hamburger {
        position: absolute;
        right: 10px;
        /* top: 10px; */
        display: block;
        visibility: visible;
    }
}
</style>
