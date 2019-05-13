<template>
    <v-card class="blog-post-card" v-on:click="doRoute()">
        <v-img v-bind:src="post.thumbnail" aspect-ratio="1.75"></v-img>
        <v-card-title>
            <div>
                <h3>{{post.title}}</h3>
                <div>{{post.snippet}}</div>
            </div>
        </v-card-title>
        <v-card-actions>
            <v-btn flat color="blue" :to="`/blog/${post.uid}`">More</v-btn>
        </v-card-actions>
    </v-card>
    <!-- <div></div> -->
</template>

<script>
import axios from 'axios';
export default {
    props: ['post'],
    methods: {
        doRoute() {
            this.$router.push(`/blog/${this.post.uid}`);
        }
    }
};
</script>

<style>
.blog-post-card {
    cursor: pointer;
}
</style>
