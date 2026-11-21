import type {Routes} from '@angular/router';
import {IndexPage} from './features/example/index';
import {TestPage} from './features/example/test';

export const routes: Routes = [
    {path: '', component: IndexPage},
    {path: 'test', component: TestPage},
];
