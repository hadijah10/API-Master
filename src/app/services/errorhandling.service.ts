import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorhandlingService {

  constructor() { }
    handleError(error: HttpErrorResponse){
    let errormessage = 'AN unknown error occurred'

    if(error.error instanceof ErrorEvent){
      errormessage = `Client Error: ${error.error.message}`;
    }
    else{
      errormessage = `Server Error: ${error.status}: ${error.message}`
    }
    return throwError(()=> new Error(errormessage ));
  }
}
