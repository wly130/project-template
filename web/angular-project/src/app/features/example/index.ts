import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
    imports: [RouterLink],
    template: `
        <main>
            <h1>首页</h1>
            <a routerLink="/test">打开测试页</a>
        </main>
    `,
})
export class IndexPage {}
