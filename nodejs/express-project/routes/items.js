const {Router} = require('express');

const router = Router();
const items = new Map();
let nextId = 1;

function validName(req, res, next) {
    const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
    if (!name) return res.status(400).json({message: 'name is required'});
    req.body.name = name;
    next();
}

router.param('id', (req, res, next, id) => {
    const item = items.get(Number(id));
    if (!item) return res.status(404).json({message: 'Item not found'});
    req.item = item;
    next();
});

router.get('/', (_req, res) => res.json([...items.values()]));
router.get('/:id', (req, res) => res.json(req.item));

router.post('/', validName, (req, res) => {
    const item = {id: nextId++, name: req.body.name};
    items.set(item.id, item);
    res.status(201).json(item);
});

router.put('/:id', validName, (req, res) => {
    req.item.name = req.body.name;
    res.json(req.item);
});

router.delete('/:id', (req, res) => {
    items.delete(req.item.id);
    res.sendStatus(204);
});

module.exports = router;
