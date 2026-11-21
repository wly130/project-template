import {Service} from '../bindings/wails3-project/internal/items/index.js';

const index = document.querySelector('#index');
const test = document.querySelector('#test');
const result = document.querySelector('#result');

function showPage() {
    const testing = location.hash === '#/test';
    index.hidden = testing;
    test.hidden = !testing;
}

window.addEventListener('hashchange', showPage);
showPage();

document.querySelector('#list').addEventListener('click', async () => {
    try {
        result.textContent = JSON.stringify(await Service.List());
    } catch (error) {
        result.textContent = String(error);
    }
});
