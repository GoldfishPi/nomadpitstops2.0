import pkg from './package'

export default {
    mode: 'universal',

    /*
    ** Headers of the page
    */
    head: {
        title: 'Nomad Pit Stops',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: pkg.description }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:300,700' },
        ]
    },

    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#4AA0D5' },

    /*
    ** Global CSS
    */
    css: [
        '@/assets/css/main.css'
    ],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        { src: "~plugins/vue2-google-maps.js", ssr: true },
        // { src: "~plugins/vueMarkdown.js", ssr: true },
    ],

    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/pwa',
        ['@nuxtjs/axios', {
            baseURL: 'https://api.nomadpitstops.com'
        }]
    ],
    vendor: ['vue2-google-maps'],

    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        // transpile: [
        //     'vue2-google-maps'
        // ],
        extend(config, ctx) {
        }
    },
    env: {
        siteUrl: process.env.NODE_ENV ? 'http://localhost:3000' : 'https://nomadpitstops.com'
    }
}
