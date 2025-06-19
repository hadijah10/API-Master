import { Routes } from '@angular/router';
import { PostlistComponent } from './components/postlist/postlist.component';
import { SinglepostComponent } from './components/singlepost/singlepost.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'/posts',
        pathMatch:'full'
    },
    {
        path:'posts',
        component: PostlistComponent
    },
    {
        path:'posts/:id',
        component: SinglepostComponent
    }
];
