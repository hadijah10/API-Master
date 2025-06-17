import { Routes } from '@angular/router';
import { PostlistComponent } from './components/postlist/postlist.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'/posts',
        pathMatch:'full'
    },
    {
        path:'posts',
        component: PostlistComponent
    }
];
