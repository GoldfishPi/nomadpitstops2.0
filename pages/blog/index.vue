<template>
    <div class="blog-container">
        <h1 class="__page-heading">Blog</h1>
        <div class="cards">
            <BlogPostCard
                class="__card __card-hoverable card"
                v-for="(post, index) of manifest"
                :key="index"
                :post="post"
            />
        </div>
    </div>
</template>

<script>
import postManifest from '@/static/blog/postManifest';
import BlogPostCard from '@/components/BlogPostCard';
export default {
    components: {
        BlogPostCard
    },
    data() {
        return {
            manifest: postManifest
        };
    },
    mounted() {
        this.$store.commit('nav/setNav', false);
        this.$store.commit('nav/setDefault', false);

        console.log('manifest', postManifest);
        // this.$store.dispatch('blog/getBlogPosts');
    },
    head() {
        return {
            title: 'Nomad Pit Stops | Blog'
        };
    }
    // middleware: 'blogs'
};
</script>

<style>
.blog-container .cards {
    margin: 1.3rem;
    margin-top: 0;
}
.blog-container .cards h2 {
    margin-bottom: 1rem;
    text-align: center;
}
.blog-container .cards img {
    max-width: 100%;
    height: 300px;
    margin-left: auto;
    margin-right: auto;
    display: block;
}
.blog-container .card {
    margin-bottom: 1.3rem;
    color: initial;
    text-decoration: none;
}
.blog-container .cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1.3rem;
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
