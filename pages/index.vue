<template>
    <v-layout align-center fill-height wrap>  
        <!-- <v-container fluid>
        </v-container> -->
        <v-flex xs12 sm6 md5><Hammock class="hammock"/></v-flex>
        <v-flex xs12 sm6 md7>
            <h2 class="white--text text-xs-center">Language Culture Travel</h2>
            <h1 class="heading white--text text-xs-center">Nomad Pit Stops</h1>
            <div class="text-xs-center">
                <v-btn to="/blog"  depressed title="Blog">Blog</v-btn>
                <v-btn to="/pitstops"  depressed title="Pit Stops">Pit Stops</v-btn>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
import Hammock from './../static/hammock.svg?inline'

export default {
    components: {
        Hammock
    },
    mounted() {
    }
};
//#4AA0D5
</script>

<style scoped>
.layout {
    background-color: #4AA0D5;
}
.hammock {
    fill: white;
    margin: 1rem;
}
</style>
