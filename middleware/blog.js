export default function (context) {
    return context.$axios.get(`/blog/${context.route.params.id}`)
        .then(res => {
            context.store.commit('blog/updatePost', res.data)
        })
}