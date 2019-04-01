<template>
    <div class="post-card-container">
        <nuxt-link class="link" :to="`/blog/${post.postId}`">
            <div class="description">
                <h2>{{post.title}}</h2>
                <p>{{post.description}}</p>
            </div>
            <h2>{{post.title}}</h2>
            <img v-bind:src="`/blog/posts/${post.id}/thumbnail.jpg`" alt>
        </nuxt-link>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: ['post']
};
</script>

<style>
.post-card-container .link {
    position: relative;
    color: initial;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}
.post-card-container img {
    max-width: 400px;
}
.post-card-container .description {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: white;
    text-align: center;
    opacity: 0;
    transition: opacity 0.5s;
}
.post-card-container:hover .description {
    opacity: 1;
}
</style>
