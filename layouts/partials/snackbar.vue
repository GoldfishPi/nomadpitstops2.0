<template>
    <v-snackbar v-model="show">
        {{message}}
        <v-btn flat color="info" @click.native="show = false" :timeout="timeout">Close</v-btn>
    </v-snackbar>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            message: '',
            timeout: 1000
        };
    },
    created() {
        this.$store.watch(
            state => state.snackbar.snack,
            () => {
                const msg = this.$store.state.snackbar.snack;
                if (msg !== '') {
                    this.show = true;
                    this.message = this.$store.state.snackbar.snack;
                    this.$store.commit('snackbar/setSnack', '');
                }
            }
        );
    }
};
</script>