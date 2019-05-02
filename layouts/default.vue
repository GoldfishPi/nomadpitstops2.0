<template>
    <v-app>
        <Nav/>
        <v-content>
            <nuxt/>
        </v-content>
        <Snackbar/>
    </v-app>
</template>
<script>
import Nav from './partials/nav';
import Snackbar from './partials/snackbar';
export default {
    components: {
        Nav,
        Snackbar
    }
};
</script>

<style>
._content {
    padding-top: 5rem;
}
</style>
