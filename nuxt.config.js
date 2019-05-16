import pkg from './package';
import TerserPlugin from 'terser-webpack-plugin';
import prismic from 'prismic-javascript';
import prismicConfig from './prismic.config';

export default {
    mode: 'universal',
    // buildDir: './functions/nuxt',
    // buildDir: './dist',
    /*
     ** Headers of the page
     */
    head: {
        title:
            'Nomad Pit Stops | Intentional Travel Tools For The Modern Nomad',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
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
            {
                rel: 'stylesheet',
                href:
                    'https://fonts.googleapis.com/css?family=Montserrat:300,700'
            },
            {
                rel: 'stylesheet',
                href: 'https://use.fontawesome.com/releases/v5.6.3/css/all.css'
            }
        ]
    },

    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#4AA0D5' },

    /*
     ** Global CSS
     */
    css: ['@/assets/css/main.css'],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        { src: '~plugins/ga.js', ssr: false },
        { src: '~plugins/vue2-google-maps.js', ssr: true },
        { src: '~plugins/firebase.js', ssr: false },
        { src: '~plugins/fireauth.js', ssr: false }
        // { src: "~plugins/vueMarkdown.js", ssr: true },
    ],

    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/pwa',
        [
            '@nuxtjs/axios',
            {
                baseURL:
                    process.env.NODE_ENV !== 'production'
                        ? 'http://localhost:3001'
                        : 'https://api.nomadpitstops.com'
            }
        ],
        '@nuxtjs/vuetify',
        '@nuxtjs/sitemap'
        // {
        //     src: 'nuxt-firebase',
        //     options: {
        //         apiKey: 'AIzaSyCbsunvjqhzvVJimsptgvg6UR_ysEa9XEo',
        //         authDomain: 'nomad-pit-stops.firebaseapp.com',
        //         databaseURL: 'https://nomad-pit-stops.firebaseio.com',
        //         projectId: 'nomad-pit-stops',
        //         storageBucket: 'nomad-pit-stops.appspot.com',
        //         messagingSenderId: '1069723342252'
        //     }
        // }
    ],
    vendor: ['vue2-google-maps'],

    /*
     ** Build configuration
     */
    build: {
        // optimization: {
        //     minimize: true,
        //     minimizer: [
        //         new TerserPlugin({
        //             cache: true,
        //             parallel: false
        //         })
        //     ]
        // }
    },
    env: {
        siteUrl:
            process.env.NODE_ENV !== 'production'
                ? 'http://localhost:3333'
                : 'https://nomadpitstops.com'
    },
    sitemap: {
        hostname: 'https://nomadpitstops.com',
        gzip: true,
        async routes(callback) {
            let api = await prismic.api(prismicConfig.endpoint);
            let posts = await api.query(
                prismic.Predicates.at('document.type', 'blog-post')
            );
            callback(null, posts.results.map(post => '/blog/' + post.uid));
        }
    }
};
