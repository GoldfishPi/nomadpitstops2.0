
import prismicConfig from '../../prismic.config';
import prismic from 'prismic-javascript';
import axios from 'axios';

export const createRoutes = async () => {

    const routes = await Promise.all([
        await createPrismicRoutes(),
        await createPitstopRoutes()
    ]);

    let flatRoutes:string[] = [];
    for(let subRoutes of routes) {
        flatRoutes = [
            ...flatRoutes,
            ...subRoutes
        ];
    }

    return flatRoutes; 
}

const createPrismicRoutes = async ():Promise<string[]> => {
    try {
        const api:any = await prismic.api(prismicConfig.endpoint);
        const posts = await api.query(
            prismic.Predicates.at('document.type', 'blog-post')
        );
        return posts.results.map(post => '/blog/' + post.uid)
    } catch(e) {
        console.error('Failed to create prismic routes', e);
    }
    return []
}

const createPitstopRoutes = async ():Promise<string[]> => {
    try {

        const pitstops = await axios.post('https://lol.nomadpitstops.com/', {
            query: `
            {
                Pitstops {
                    id
                }
            }
        `
        });
        return pitstops.data.data.Pitstops
            .map(ps => `/pitstops/${ps.id}`);

    } catch (e) {
        console.error('Failed to create Pit Stop routes', e);
    }
    return [];
}

