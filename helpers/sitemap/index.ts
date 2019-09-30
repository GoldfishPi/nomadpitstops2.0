
import prismicConfig from '../../prismic.config';
import prismic from 'prismic-javascript';
import axios from 'axios';
import { createRoutes } from "../routes";

export const createSitemap = async cb => {
    const map = await createRoutes();
    cb(null, map);
}
