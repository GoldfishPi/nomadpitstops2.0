<template></template>

<script>
export default {
    mounted() {
        this.$store.commit('nav/setNav', false);
        this.$store.commit('nav/setDefault', false);
    }
};
</script>

<style>
</style>
