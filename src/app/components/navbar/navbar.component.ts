import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

route = inject(Router)

get token(): string | null {
  return localStorage.getItem('authToken');
}
constructor(private authservice: AuthService){

}

handleLogOut(){
  this.authservice.logout();

}

handleLogIn(){
  this.route.navigate(['login'])
}

}
