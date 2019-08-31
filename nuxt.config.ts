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
    generate: {
        routes: async () => {
            const api:any = await prismic.api(prismicConfig.endpoint);
            const posts = await api.query(
                prismic.Predicates.at('document.type', 'blog-post')
            );
            return posts.results.map(post => '/blog/' + post.uid)
        }
    },
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
            { name: 'robots', content: 'index, follow' },
            { name: 'google-site-verification', content:'9VGw1vGDng4XjENSPsdsIUp3wLu3s9mSc7-VD2boKO8' }
            // { hid: 'description', name: 'description', content: pkg.description }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
            { rel: 'icon', type: 'image/x-icon', href: '/favicon-228.png', sizes:'228x228' },
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
        { src: '~plugins/apollo.ts', ssr: true },
    ],

    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/pwa',
        [
            '@bazzite/nuxt-netlify', { }
        ],
        ['@nuxtjs/apollo'],
        [
            '@nuxtjs/axios',
            {
                baseURL:
                process.env.NODE_ENV !== 'production'
                ? 'http://localhost:3001'
                : 'https://lol.nomadpitstops.com'
            }
        ],
        '@nuxtjs/vuetify',
        '@nuxtjs/sitemap',
        'nuxt-svg',
        [ 
            'nuxt-fire',
            {
                config: {
                    development: {

                        apiKey: 'AIzaSyCbsunvjqhzvVJimsptgvg6UR_ysEa9XEo',
                        authDomain: 'nomad-pit-stops.firebaseapp.com',
                        databaseURL: 'https://nomad-pit-stops.firebaseio.com',
                        projectId: 'nomad-pit-stops',
                        storageBucket: 'nomad-pit-stops.appspot.com',
                        messagingSenderId: '1069723342252',
                        appId:'1:1069723342252:web:d7e898b8b6faafb1'
                    },
                    production: {
                        apiKey: 'AIzaSyCbsunvjqhzvVJimsptgvg6UR_ysEa9XEo',
                        authDomain: 'nomad-pit-stops.firebaseapp.com',
                        databaseURL: 'https://nomad-pit-stops.firebaseio.com',
                        projectId: 'nomad-pit-stops',
                        storageBucket: 'nomad-pit-stops.appspot.com',
                        messagingSenderId: '1069723342252',
                        appId:'1:1069723342252:web:d7e898b8b6faafb1'
                    }
                },

            }
        ]
    ],
    apollo: {
        clientConfigs: {
            default: {
                httpEndpoint: process.env.NODE_ENV === 'production' ? 'https://lol.nomadpitstops.com' : 'http://localhost:3001'
            }
        }
    },
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
        ? 'http://localhost:3000'
        : 'https://nomadpitstops.com'
    },
    sitemap: {
        hostname: 'https://nomadpitstops.com',
        gzip: true,
        async routes(callback) {
            let api:any = await prismic.api(prismicConfig.endpoint);
            let posts = await api.query(
                prismic.Predicates.at('document.type', 'blog-post')
            );
            callback(null, posts.results.map(post => '/blog/' + post.uid));
        }
    }
};
