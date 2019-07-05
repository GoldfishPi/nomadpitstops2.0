<template>
    <v-card flat outlined class="blog-post-card" v-on:click="doRoute()">
        <v-img v-bind:src="post.lead" aspect-ratio="1.75"></v-img>
        <v-card-title>
            <div>
                <h3 class="title">{{post.title}}</h3>
            </div>
        </v-card-title>
        <v-card-text>
            <div class="grey--text body-1"><span v-if="post.type">{{post.type}} -</span> {{post.date}}</div>
            <div class="body-2">{{post.snippet}}</div>
        </v-card-text>
        <v-card-actions>
            <v-btn text color="blue" :title="post.title" :to="`/blog/${post.uid}`">More</v-btn>
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
