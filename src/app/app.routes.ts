import { Routes } from '@angular/router';
import { PostlistComponent } from './components/postlist/postlist.component';
import { SinglepostComponent } from './components/singlepost/singlepost.component';
import { CreatepostComponent } from './components/createpost/createpost.component';

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
    },
    {
        path:'posts/createpost',
        component: CreatepostComponent
    }
];
