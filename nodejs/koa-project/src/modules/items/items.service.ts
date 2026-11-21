type Item = {id: number; name: string};

export function createItems() {
    const items = new Map<number, Item>();
    let nextId = 1;

    return {
        list: () => [...items.values()],
        get: (id: number) => items.get(id),
        create(name: string) {
            const item = {id: nextId++, name};
            items.set(item.id, item);
            return item;
        },
        update(id: number, name: string) {
            if (!items.has(id)) return;
            const item = {id, name};
            items.set(id, item);
            return item;
        },
        remove: (id: number) => items.delete(id),
    };
}
