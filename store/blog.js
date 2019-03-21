export const state = () => {
    return {
        blogPosts: []
    }
}
export const mutations = {
    setBlogPosts(state, posts) {
        state.blogPosts = posts;
    }
}
export const actions = {
    getBlogPosts(context) {
        this.$axios.get('/blog')
            .then(posts => {
                context.commit('setBlogPosts', posts.data.posts);
                console.log('blog poosts', posts)
            })
    }
}