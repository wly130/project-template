import {contextBridge, ipcRenderer} from 'electron';

type Item = {id: number; name: string};

export const itemsApi = {
    list: (): Promise<Item[]> => ipcRenderer.invoke('items:list'),
    get: (id: number): Promise<Item> => ipcRenderer.invoke('items:get', id),
    create: (name: string): Promise<Item> => ipcRenderer.invoke('items:create', name),
    update: (id: number, name: string): Promise<Item> => ipcRenderer.invoke('items:update', id, name),
    remove: (id: number): Promise<void> => ipcRenderer.invoke('items:delete', id),
};

contextBridge.exposeInMainWorld('items', itemsApi);
