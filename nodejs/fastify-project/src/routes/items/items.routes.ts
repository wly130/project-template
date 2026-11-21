import type {FastifyPluginAsync} from 'fastify';
import {createItems} from '../../modules/items/items.service.ts';
import {itemBody, itemParams, type ItemInput} from '../../validation/items.dto.ts';

type ItemParams = {id: number};

export const itemsRoutes: FastifyPluginAsync = async (app) => {
    const items = createItems();
    const missing = {message: 'Item not found'};

    app.get('/', {prefixTrailingSlash: 'both'}, () => items.list());

    app.get<{Params: ItemParams}>('/:id', {schema: {params: itemParams}}, ({params}, reply) => {
        return items.get(params.id) ?? reply.code(404).send(missing);
    });

    app.post<{Body: ItemInput}>('/', {prefixTrailingSlash: 'both', schema: {body: itemBody}}, ({body}, reply) =>
        reply.code(201).send(items.create(body.name.trim())),
    );

    app.put<{Body: ItemInput; Params: ItemParams}>(
        '/:id',
        {schema: {body: itemBody, params: itemParams}},
        ({body, params}, reply) => {
            return items.update(params.id, body.name.trim()) ?? reply.code(404).send(missing);
        },
    );

    app.delete<{Params: ItemParams}>('/:id', {schema: {params: itemParams}}, ({params}, reply) => {
        return items.remove(params.id) ? reply.code(204).send() : reply.code(404).send(missing);
    });
};
