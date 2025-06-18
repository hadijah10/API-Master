import { Routes } from '@angular/router';
import { PostlistComponent } from './components/postlist/postlist.component';
import { SinglepostComponent } from './components/singlepost/singlepost.component';
import { CreatepostComponent } from './components/createpost/createpost.component';

export const routes: Routes = [
   
    {
        path:'',
        component: PostlistComponent
    },
    {
        path:':id',
        component: SinglepostComponent
    },
    {
        path:'createpost',
        component: CreatepostComponent
    }
];
