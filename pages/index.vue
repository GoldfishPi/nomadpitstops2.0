<template>
    <section class="container">
        <div class="screen">
            <h1 class="title">Intentional Travel Tools</h1>
        </div>
        <a href="#ligth"></a>
        <div class="screen contrast">
            <h2 class="title">Lightweight, Unabtrussive, and Easy to Use</h2>
        </div>
        <div class="screen">
            <h2 class="title">Field Tested and Community Driven</h2>
        </div>
        <div class="screen contrast">
            <h2 class="title">Ready to Get Started?</h2>
            <div class="buttons">
                <div class="wraper">
                    <nuxt-link to="/map" class="__btn __btn-light login">Map</nuxt-link>
                    <nuxt-link to="/blog" class="__btn __btn-light signup">Blog</nuxt-link>
                    <!-- <button class="__btn __btn-primary login">Login</button>
                    <button class="__btn __btn-light signup">Signup</button>-->
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Logo from '~/components/Logo.vue';

export default {
    mounted() {
        this.$store.commit('nav/setDefault', true);
        this.$store.commit('nav/setNav', true);
    }
};
</script>

<style>
.screen {
    height: 100vh;
    display: grid;
    align-content: center;
    justify-content: center;
    /* background-color: #4AA0D5; */
}
.screen .title {
    font-size: 5rem;
    color: #4aa0d5;
    padding-bottom: 2rem;
    text-align: center;
}
.screen.contrast {
    background-color: #4aa0d5;
}
.screen.contrast .title {
    color: white;
}
.buttons {
    margin-top: 1rem;
    display: flex;
    justify-content: space-around;
}
.login {
    margin-right: 1rem;
}
.signup {
    margin-left: 1rem;
}
</style>
