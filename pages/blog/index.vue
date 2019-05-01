<template>
    <div class="blog-container">
        <h1 class="__page-heading">Blog</h1>
        <div class="cards">
            <BlogPostCard v-for="(post, index) of manifest" :key="index" :postKey="index"/>
            <!-- <v-card v-for="(post, index) of manifest" :key="index">
                <v-card-title primary-title>
                    <div>
                        <h3>{{post.title}}</h3>
                        <div>{{post}}</div>
                    </div>
                </v-card-title>
            </v-card>-->
        </div>
    </div>
</template>

<script>
import postManifest from '@/static/blog/postManifest';
import BlogPostCard from '@/components/BlogPostCard';
import axios from 'axios';
export default {
    components: {
        BlogPostCard
    },
    computed: {
        posts() {
            return this.$store.state.blogPosts;
        }
    },
    data() {
        return {
            manifest: postManifest
        };
    },
    mounted() {
        this.$store.commit('nav/setNav', false);
        this.$store.commit('nav/setDefault', false);
        // this.$store.dispatch('blog/getBlogPosts', false);
        // console.log('manifest', postManifest);
        // this.$store.dispatch('blog/getBlogPosts');
    },
    head() {
        return {
            title: 'Nomad Pit Stops | Blog'
        };
    },
    asyncData(context) {
        context.store.dispatch('blog/getBlogPosts');
        var posts = context.store.state.blog.blogPosts;
        var promises = posts.map(post => {
            return axios
                .get(
                    `${context.env.siteUrl}/blog/posts/${
                        post.id
                    }/description.md`
                )
                .then(res => {
                    post.description = res.data;
                    context.store.commit('blog/setActiveBlogPost', post);
                });
        });
        // console.log('promises', promises[0]);
        return Promise.all(promises);
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
