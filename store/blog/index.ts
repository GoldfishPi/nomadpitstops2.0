import prismic from 'prismic-javascript';
import prismicDom from 'prismic-dom';
import prismicConfig from '@/prismic.config.js';
import moment from 'moment';
import { BlogPost } from '~/types/Blog';

export interface BlogState {
    posts:Array<BlogPost>;
    activePost:BlogPost | boolean;
}

export const state = ():BlogState => {
    return {
        posts: [],
        activePost: false
    };
};
export const mutations = {
    SET_BLOG_POSTS(state:BlogState, posts) {
        state.posts = posts;
    },
    UPDATE_POST(state, post) {
        var updated = false;
        state.blogPosts = state.blogPosts.map(p => {
            if (p.id === post.id) {
                updated = true;
                return post;
            }
            return p;
        })
        if (!updated) state.blogPosts.push(post);
    },
    UPDATE_POST_BODY(state, { post, uid }) {
        post.body = prismicDom.RichText.asHtml(post.body);
        post.rendered = true;
    },
    SET_ACTIVE_POST(state, post) {
        state.activeBlogPost = post;
    }
};
export const actions = {
    async FETCH({ commit }) {
        const api = await prismic.getApi(prismicConfig.endpoint);
        let posts = await api.query(
            prismic.Predicates.at('document.type', 'blog-post'),
            { orderings : '[document.first_publication_date desc]' }
        );
        const blogPosts:Array<BlogPost> = posts.results.map(post => {
            // console.log('post', post)
            return {
                uid: post.uid,
                title: prismicDom.RichText.asText(post.data.title),
                snippet: prismicDom.RichText.asText(post.data.snippet),
                // firstPublicationDate: post.first_publication_date,
                body: post.data.body,
                thumbnail: prismicDom.Link.url(post.data.thumbnail),
                lead: prismicDom.Link.url(post.data.lead),
                rendered: false,
                date:moment(post.first_publication_date).format('MMMM, DD, YYYY '),
                type:post.data.type
            };
        })
        commit('SET_BLOG_POSTS', blogPosts);
        return posts;
    },
    RENDER_POST_BODY({ commit, state }, uid) {
        let post = state.posts.find(p => {
            return p.uid === uid;
        });
        commit('UPDATE_POST_BODY', { uid: uid, post: post });
    }
};

export const getters = {
    POSTS(state:BlogState) {
        return state.posts;
    }
}
