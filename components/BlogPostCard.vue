<template>
    <div class="post-card-container">
        <nuxt-link class="link" :to="`/blog/${post.postId}`">
            <h2>{{post.title}}</h2>
            <img v-bind:src="`./blog/posts/${post.id}/thumbnail.jpg`" alt>
            <!-- <h2>{{card.title}}</h2>
            
            <p>{{card.snippet}}</p>
            <p class="more">Read More</p>-->
        </nuxt-link>
    </div>
</template>

<script>
export default {
    props: ['post'],
    mounted() {
        console.log('post', this.post);
    }
};
</script>

<style>
.post-card-container .link {
    color: initial;
    text-decoration: none;
}
.post-card-container img {
    max-width: 400px;
}
</style>
