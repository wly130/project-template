import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
    imports: [RouterLink],
    template: `
        <main>
            <h1>测试页</h1>
            <p>环境 {{ mode }}</p>
            <a routerLink="/">返回首页</a>
        </main>
    `,
})
export class TestPage {
    readonly mode = environment.mode;
}
