<template>
    <v-app>
        <Nav/>
        <v-content>
            <nuxt/>
        </v-content>
    </v-app>
</template>
<script>
import Nav from './partials/nav';
export default {
    components: {
        Nav
    }
};
</script>

<style>
/* ._content {
    padding-top: 5rem;
} */
</style>
