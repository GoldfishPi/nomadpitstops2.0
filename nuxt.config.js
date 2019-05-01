import pkg from './package'

export default {
    mode: 'universal',

    /*
    ** Headers of the page
    */
    head: {
        title: 'Nomad Pit Stops | Intentional Travel Tools For The Modern Nomad',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 'twitter:site',
                name: 'twitter:site',
                content: '@nomadpitstops'
            },
            { name: 'robots', content: 'index, follow' }
            // { hid: 'description', name: 'description', content: pkg.description }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:300,700' },
            { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.6.3/css/all.css' },
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
        { src: '~plugins/ga.js', ssr: false },
        { src: "~plugins/vue2-google-maps.js", ssr: true },
        // { src: "~plugins/vueMarkdown.js", ssr: true },
    ],

    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/pwa',
        ['@nuxtjs/axios', {
            baseURL: process.env.NODE_ENV !== 'production' ? 'http://localhost:3001' : 'https://api.nomadpitstops.com'
        }],
        '@nuxtjs/vuetify'
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
        siteUrl: process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://nomadpitstops.com'
    }
}
