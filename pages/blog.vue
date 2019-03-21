<template>
    <div class="blog-container">
        <div class="cards">
            <div class="__card __card-hoverable card" v-for="(card, index) of posts" :key="index">
                <h2>{{card.title}}</h2>
                <img v-bind:src="card.thumbnail" alt>
                <!-- <p>{{card.snippet}}</p> -->
                <p class="more">Read More</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        posts() {
            return this.$store.state.blog.blogPosts;
        }
    },
    mounted() {
        this.$store.commit('nav/setNav', false);
        this.$store.commit('nav/setDefault', false);
        this.$store.dispatch('blog/getBlogPosts');
    }
};
</script>

<style>
.blog-container .cards {
    margin: 1.3rem;
}
.blog-container .cards h2 {
    margin-bottom: 1rem;
}
.blog-container .cards img {
    max-width: 100%;
}
.blog-container .card {
    margin-bottom: 1.3rem;
}
.blog-container .cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}
.blog-container .more {
    text-align: right;
    margin-top: 1rem;
}
@media screen and (max-width: 900px) {
    .blog-container .cards {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
}
@media screen and (max-width: 600px) {
    .blog-container .cards {
        display: grid;
        grid-template-columns: 1fr;
    }
}
</style>
