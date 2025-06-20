import { CanActivateFn,CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate{
  constructor(private router: Router){}

  canActivate():boolean{
    const token = localStorage.getItem('authToken') || null;
    if(token != null){
      return true;
    }
      this.router.navigate(['/login'])
      return false
  }
}