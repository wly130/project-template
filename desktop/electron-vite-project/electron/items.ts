import {ipcMain} from 'electron';

type Item = {id: number; name: string};

export function registerItems() {
    const items = new Map<number, Item>();
    let nextId = 1;

    function get(id: number) {
        const item = items.get(id);
        if (!item) throw new Error('Item not found');
        return item;
    }

    function parseName(input: unknown) {
        if (typeof input !== 'string' || !input.trim()) throw new Error('name is required');
        return input.trim();
    }

    ipcMain.handle('items:list', () => [...items.values()]);
    ipcMain.handle('items:get', (_event, id: number) => get(id));

    ipcMain.handle('items:create', (_event, input: unknown) => {
        const name = parseName(input);
        const item = {id: nextId++, name};
        items.set(item.id, item);
        return item;
    });

    ipcMain.handle('items:update', (_event, id: number, input: unknown) => {
        const item = get(id);
        item.name = parseName(input);
        return item;
    });

    ipcMain.handle('items:delete', (_event, id: number) => {
        get(id);
        items.delete(id);
    });
}
