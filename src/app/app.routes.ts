import { Routes } from '@angular/router';
import { PostlistComponent } from './components/postlist/postlist.component';
import { SinglepostComponent } from './components/singlepost/singlepost.component';
import { CreatepostComponent } from './components/createpost/createpost.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
   
    {
        path:'',
        component: PostlistComponent,
    },
     {
        path:'createpost',
        component: CreatepostComponent,
        canActivate:[AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        
    },
    {
        path:':id',
        component: SinglepostComponent,
        // canActivate:[AuthGuard]
    },
   
];
