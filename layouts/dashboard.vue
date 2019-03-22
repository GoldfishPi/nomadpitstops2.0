<template>
    <div>
        <Nav/>

        <div class="_dashboard">
            <SideNav class="_side-nav"/>
            <nuxt class="_nuxt"/>
        </div>
    </div>
</template>

<script>
import Nav from './partials/nav';
import SideNav from './partials/sideNav';
export default {
    components: {
        Nav,
        SideNav
    }
};
</script>

<style>
._dashboard {
    padding-top: 5rem;
    display: grid;
    grid-template-columns: 20vw 80vw;
}
._side-nav {
    position: fixed;
    width: 20vw;
}
._nuxt {
    grid-column: 2;
}
</style>
