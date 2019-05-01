<template>
    <div>
        <Nav/>
        <div class="_content">
            <nuxt/>
        </div>
        <Snackbar/>
    </div>
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
