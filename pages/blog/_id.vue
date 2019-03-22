<template>
    <div class="post-container">
        <div class="content">
            <h1>{{post.title}}</h1>
            <VueMarkdown>{{post.body}}</VueMarkdown>
        </div>
    </div>
</template>

<script>
// import VueMarkdown from '../node_module/VueMarkdown';
import manifest from '@/static/blog/postManifest';
import axios from 'axios';
import VueMarkdown from 'vue-markdown';
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
        console.log('window?', context.env.baseUrl);
        var post = manifest.find(p => {
            // console.log('p', p);
            return p.postId === context.route.params.id;
        });
        return axios
            .get(`${context.env.baseUrl}/blog/posts/${post.id}/index.md`)
            .then(res => {
                // console.log('lol res', res);
                post.body = res.data;
                context.store.commit('blog/setActiveBlogPost', post);
            });
        // console.log('found post', post);
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
.post-container h2 {
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
