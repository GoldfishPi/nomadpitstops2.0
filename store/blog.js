import postManifest from '@/static/blog/postManifest';
export const state = () => {
    return {
        blogPosts: [],
        activeBlogPost: {
            title: '',
            body: ''
        }
    }
}
export const mutations = {
    setBlogPosts(state, posts) {
        console.log('setting blog posts')
        state.blogPosts = posts;
    },
    updatePost(state, post) {
        var updated = false
        state.blogPosts = state.blogPosts.map(p => {
            if (p.id === post.id) {
                updated = true;
                return post
            }
            return p;
        })
        if (!updated) state.blogPosts.push(post);
    },
    setActiveBlogPost(state, post) {
        state.activeBlogPost = post;
    }
}
export const actions = {
    getBlogPosts(context) {
        if (!context.state.blogPosts.length) {
            context.commit('setBlogPosts', postManifest);
        }
    }
}