import Router from '@koa/router';
import {createItems} from '../../modules/items/items.service.ts';
import {itemName} from '../../validation/items.dto.ts';

export function createItemsRouter() {
    const router = new Router({prefix: '/api/items'});
    const items = createItems();

    router.get('/', (ctx) => {
        ctx.body = items.list();
    });

    router.get('/:id', (ctx) => {
        const item = items.get(Number(ctx.params.id));
        ctx.assert(item, 404, 'Item not found');
        ctx.body = item;
    });

    router.post('/', (ctx) => {
        const name = itemName(ctx.request.body);
        ctx.assert(name, 400, 'name is required');
        ctx.body = items.create(name);
        ctx.status = 201;
    });

    router.put('/:id', (ctx) => {
        const name = itemName(ctx.request.body);
        ctx.assert(name, 400, 'name is required');
        const item = items.update(Number(ctx.params.id), name);
        ctx.assert(item, 404, 'Item not found');
        ctx.body = item;
    });

    router.delete('/:id', (ctx) => {
        ctx.assert(items.remove(Number(ctx.params.id)), 404, 'Item not found');
        ctx.status = 204;
    });

    return router;
}
