<template>
    <v-card class="blog-post-card" v-on:click="doRoute()">
        <v-img v-bind:src="`/blog/posts/${post.id}/thumbnail.jpg`" aspect-ratio="1.75"></v-img>
        <v-card-title>
            <div>
                <h3>{{post.title}}</h3>
                <div>{{post.description}}</div>
            </div>
        </v-card-title>
        <v-card-actions>
            <v-btn flat color="blue" :to="`/blog/${post.postId}`">More</v-btn>
        </v-card-actions>
    </v-card>
    <!-- <div></div> -->
</template>

<script>
import axios from 'axios';
export default {
    props: ['postKey'],
    computed: {
        post() {
            return this.$store.state.blog.blogPosts[this.postKey];
        }
    },
    mounted() {},
    methods: {
        doRoute() {
            console.log('router', this);
            this.$router.push(`/blog/${this.post.postId}`);
        }
    }
};
</script>

<style>
.blog-post-card {
    cursor: pointer;
}
</style>
