import Koa from 'koa';
import {bodyParser} from '@koa/bodyparser';
import {createItemsRouter} from './routes/items/items.routes.ts';

export function createApp() {
    const router = createItemsRouter();
    return new Koa().use(bodyParser()).use(router.routes()).use(router.allowedMethods());
}
