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
        path:'createpost',
        component: CreatepostComponent
    },
    {
        path:':id',
        component: SinglepostComponent
    },
   
];
