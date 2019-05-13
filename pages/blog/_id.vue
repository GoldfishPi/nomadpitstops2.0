<template>
    <div class="post-container">
        <div class="content">
            <v-parallax class="cover" v-bind:src="post.lead"></v-parallax>
            <h1>{{post.title}}</h1>
            <h2 class="__text-sub">{{post.author}}</h2>
            <div class="post-content" v-html="post.body"></div>
            <!-- <VueMarkdown>{{post.body}}</VueMarkdown> -->
        </div>
    </div>
</template>

<script>
// import VueMarkdown from '../node_module/VueMarkdown';
import manifest from '@/static/blog/postManifest';
import axios from 'axios';
import VueMarkdown from 'vue-markdown';
import marked from 'marked';
import prismicDom from 'prismic-dom';
export default {
    components: {
        VueMarkdown
    },
    computed: {
        post() {
            return this.$store.state.blog.activeBlogPost;
        }
    },
    async asyncData({ store, route }) {
        await store.dispatch('blog/fetchBlogPosts');
        var post = store.state.blog.blogPosts.find(p => {
            // console.log('p', p);
            return p.uid === route.params.id;
        });
        if (!post.rendered) {
            store.dispatch('blog/renderBody', post.uid);
        }
        store.commit('blog/setActiveBlogPost', post);
    },
    head() {
        return {
            title: this.$store.state.blog.activeBlogPost.title,
            meta: [
                //Normal
                {
                    hid: 'description',
                    name: 'description',
                    content: this.$store.state.blog.activeBlogPost.snippet
                },
                //OG
                {
                    hid: 'og:title',
                    name: 'og:title',
                    content: this.$store.state.blog.activeBlogPost.title
                },
                {
                    hid: 'og:image',
                    name: 'og:image',
                    content: this.$store.state.blog.activeBlogPost.lead
                },
                {
                    hid: 'og:type',
                    name: 'og:type',
                    content: 'website'
                },
                {
                    hid: 'og:description',
                    name: 'og:description',
                    content: this.$store.state.blog.activeBlogPost.description
                },
                {
                    hid: 'or:url',
                    name: 'og:url',
                    content: process.env.siteUrl + this.$route.path
                },
                //twitter
                {
                    hid: 'twitter:description',
                    name: 'twitter:description',
                    content: this.$store.state.blog.activeBlogPost.description
                },
                {
                    hid: 'twitter:image',
                    name: 'twitter:image',
                    content: this.$store.state.blog.activeBlogPost.thumbnail
                },
                {
                    hid: 'twitter:title',
                    name: 'twitter:title',
                    content: this.$store.state.blog.activeBlogPost.title
                },
                {
                    hid: 'twitter:card',
                    name: 'twitter:card',
                    content: 'website'
                }
            ]
        };
    }
};
</script>

<style>
.post-container {
    /* margin: 1rem 6rem; */
    /* display: grid;
    grid-template-columns: 1fr 3fr 1fr; */
    display: flex;
    align-items: center;
    justify-content: center;
}
.post-container .content {
    /* grid-column: 2; */
    width: calc(100vw - 10em);
    max-width: 800px;
}
.post-container .cover {
    /* max-width: 100%; */
    width: 100vw;
    margin: 0 calc(-50vw + 50%);
    /* max-height: 60vh; */
    /* object-fit: cover; */
}
.post-container .post-content img {
    max-width: 100%;
}
.post-container h1 {
    font-size: 4rem;
    margin: 1rem 0;
}
.post-content h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}
.post-container p {
    padding-bottom: 3rem;
}
@media screen and (max-width: 700px) {
    .post-container h1 {
        font-size: 2.8rem;
    }
}
@media screen and (max-width: 500px) {
    .post-container {
        grid-template-columns: 1fr 5fr 1fr;
    }
}
</style>
