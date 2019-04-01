<template>
    <div class="post-container">
        <div class="content">
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
export default {
    components: {
        VueMarkdown
    },
    computed: {
        post() {
            return this.$store.state.blog.activeBlogPost;
        }
    },
    asyncData(context) {
        var post = manifest.find(p => {
            // console.log('p', p);
            return p.postId === context.route.params.id;
        });

        return Promise.all([
            axios
                .get(`${context.env.siteUrl}/blog/posts/${post.id}/index.md`)
                .then(res => {
                    // console.log('lol res', res);
                    post.body = marked(res.data);
                    context.store.commit('blog/setActiveBlogPost', post);
                }),
            axios
                .get(
                    `${context.env.siteUrl}/blog/posts/${
                        post.id
                    }/description.md`
                )
                .then(res => {
                    // console.log('lol res', res);
                    post.description = res.data;
                    context.store.commit('blog/setActiveBlogPost', post);
                })
        ]);
        // console.log('found post', post);
    },
    head() {
        return {
            title: this.$store.state.blog.activeBlogPost.title,
            meta: [
                //Normal
                {
                    hid: 'description',
                    name: 'description',
                    content: this.$store.state.blog.activeBlogPost.description
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
                    content: `${process.env.siteUrl}/blog/posts/${
                        this.$store.state.blog.activeBlogPost.id
                    }/cover.jpg`
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
                    content: `${process.env.siteUrl}/blog/posts/${
                        this.$store.state.blog.activeBlogPost.id
                    }/thumbnail.jpg`
                },
                {
                    hid: 'twitter:title',
                    name: 'twitter:title',
                    content: this.$store.state.blog.activeBlogPost.title
                }
            ]
        };
    }
};
</script>

<style>
.post-container {
    /* margin: 1rem 6rem; */
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
}
.post-container .content {
    grid-column: 2;
}
.post-container img {
    max-width: 100%;
}
.post-container h1 {
    font-size: 2.5rem;
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
        font-size: 1.3rem;
    }
}
@media screen and (max-width: 500px) {
    .post-container {
        grid-template-columns: 1fr 5fr 1fr;
    }
}
</style>
