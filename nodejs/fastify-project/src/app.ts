import Fastify from 'fastify';
import {itemsRoutes} from './routes/items/items.routes.ts';

export function createApp() {
    return Fastify({logger: true}).register(itemsRoutes, {prefix: '/api/items'});
}
