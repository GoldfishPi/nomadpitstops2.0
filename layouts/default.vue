<template>
    <v-app>
        <Nav/>
        <v-content>
            <nuxt/>
        </v-content>
        <Snackbar/>
        <LoginDialog/>
    </v-app>
</template>
<script>
import Nav from './partials/nav';
import Snackbar from './partials/snackbar';
import LoginDialog from './partials/loginDialog';
import Pitstops from './../components/Pitstops.vue';
export default {
    components: {
        Nav,
        Snackbar,
        LoginDialog,
        Pitstops
    }
};
</script>

<style>
/* ._content {
    padding-top: 5rem;
} */
</style>
