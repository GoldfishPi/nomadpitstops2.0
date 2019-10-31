import Vue from "vue";
export default function(context:any) {
    return {
        httpEndpoint: process.env.NODE_ENV === 'production' ? 'https://lol.nomadpitstops.com' : 'http://localhost:3001',
        httpLinkOptions: {
        },
        apollo: {
            defaultOptions: {
                query: {
                    loadingKey: 'loading',
                    fetchPolicy: 'no-cache',
                },
            }
        }
    }

}
