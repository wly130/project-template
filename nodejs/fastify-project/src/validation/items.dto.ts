export type ItemInput = {name: string};

export const itemBody = {
    type: 'object',
    required: ['name'],
    properties: {name: {type: 'string', pattern: '\\S'}},
};

export const itemParams = {
    type: 'object',
    required: ['id'],
    properties: {id: {type: 'integer', minimum: 1}},
};
