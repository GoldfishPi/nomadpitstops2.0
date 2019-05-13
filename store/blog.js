import postManifest from '@/static/blog/postManifest';
import prismic from 'prismic-javascript';
import prismicDom from 'prismic-dom';
import prismicConfig from '@/prismic.config.js';
export const state = () => {
    return {
        blogPosts: [],
        activeBlogPost: {
            title: '',
            body: ''
        }
    };
};
export const mutations = {
    setBlogPosts(state, posts) {
        state.blogPosts = posts;
    },
    updatePost(state, post) {
        var updated = false;
        state.blogPosts = state.blogPosts.map(p => {
            if (p.id === post.id) {
                updated = true;
                return post;
            }
            return p;
        });
        if (!updated) state.blogPosts.push(post);
    },
    updateBody(state, { post, uid }) {
        post.body = prismicDom.RichText.asHtml(post.body);
        post.rendered = true;
    },
    setActiveBlogPost(state, post) {
        state.activeBlogPost = post;
    }
};
export const actions = {
    async fetchBlogPosts({ commit }) {
        const api = await prismic.getApi(prismicConfig.endpoint);
        let posts = await api.query(
            prismic.Predicates.at('document.type', 'blog-post')
        );
        posts = posts.results.map(post => {
            return {
                uid: post.uid,
                title: prismicDom.RichText.asText(post.data.title),
                snippet: prismicDom.RichText.asText(post.data.snippet),
                firstPublicationDate: post.first_publication_date,
                body: post.data.body,
                thumbnail: prismicDom.Link.url(post.data.thumbnail),
                lead: prismicDom.Link.url(post.data.lead),
                rendered: false
            };
        });
        commit('setBlogPosts', posts);
        return posts;
    },
    renderBody({ commit, state }, uid) {
        let post = state.blogPosts.find(p => {
            return p.uid === uid;
        });
        commit('updateBody', { uid: uid, post: post });
    }
};
