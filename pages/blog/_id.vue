<template>
    <div>
        <div class="post-container">
            <div class="content">
                <v-parallax class="cover" v-bind:src="post.lead"></v-parallax>
                <v-btn to="/blog" :class="`back ${backClass}`" fab large color="primary">
                    <v-icon>fas fa-chevron-left</v-icon>
                </v-btn>
                <h1>{{post.title}}</h1>
                <h2 class="__text-sub">{{post.author}}</h2>
                <div class="post-content" v-html="post.body"></div>
                <!-- <VueMarkdown>{{post.body}}</VueMarkdown> -->
                
            </div>
        </div>
        <v-footer class="pa-3">
            <v-container fluid>
                <h2 class="subheading grey--text">Latest Posts</h2>
                <div class="posts">
                    <BlogPostCard v-for="(post, index) of latestPosts" :key="index" :post="post"/>
                    <!-- <v-btn text color="primary">lol</v-btn> -->
                    <!-- <v-card v-for="post in latestPosts" :key="post.uid" :to="`/blog/${post.uid}`"  margin="5" flat outlined>
                        <v-img v-bind:src="post.lead" aspect-ratio="1.75"></v-img>
                        <v-card-title>{{post.title}}</v-card-title>
                        <v-card-actions>
                            <v-btn text color="primary">More</v-btn>
                        </v-card-actions>
                    </v-card> -->
                </div>
            </v-container>
            
        </v-footer>
    </div>
    
</template>

<script>
import axios from 'axios';
import VueMarkdown from 'vue-markdown';
import marked from 'marked';
import prismicDom from 'prismic-dom';
import BlogPostCard from './../../components/BlogPostCard.vue'
export default {
    components: {
        VueMarkdown,
        BlogPostCard
    },
    data: () => ({
        backClass:'top'
    }),
    computed: {
        post() {
            return this.$store.state.blog.activeBlogPost;
        },
        latestPosts() {
            return this.$store.state.blog.blogPosts.slice(0, 3);
        }
    },
    mounted() {
        if(window.scrollY > 20) {
            this.backClass = '';
        } else {
            this.backClass = 'top'
        }
        window.addEventListener('scroll',this.scroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.scroll);
    },
    methods: {
        scroll(e) {
            if(window.scrollY > 20) {
                this.backClass = '';
            } else {
                this.backClass = 'top'
            }
        }
    },
    async asyncData({ store, route }) {
        await store.dispatch('blog/FETCH');
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
.back {
    position: fixed;
    left: 10px;
    top:10px;
    transition: top .5s;
}
.back.top {
    top: 70px;
}
.posts {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1rem;
    /* grid-template-rows: 100px; */
}
@media screen and (max-width: 700px) {
    .post-container h1 {
        font-size: 2.8rem;
    }
    .posts {
        grid-template-columns: 1fr;
    }
}
@media screen and (max-width: 500px) {
    .post-container {
        grid-template-columns: 1fr 5fr 1fr;
    }
}
</style>
