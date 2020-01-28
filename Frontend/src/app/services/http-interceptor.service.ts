

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError,tap} from 'rxjs/operators';
@Injectable()
export class HttpInterceptorService implements HttpInterceptor{

  constructor( private authenticationService:AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url
    const currentUser = this.authenticationService.currentUserValue;
    const isLoggedIn = currentUser;
    const idToken = localStorage.getItem("token");
   //  const isLoggedIn = currentUser && currentUser.token;
    if (isLoggedIn) {
        request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${idToken}`
            }
        });
    }
    return next.handle(request);
    
    
    
      // .pipe(
      // tap(event => {
      //   if (event instanceof HttpResponse) {
           
      //     console.log(" all looks good");
      //     // http response status code
      //     console.log(event.status);
      //   }
      // }, error => {
      //  // http response status code
      //     console.log("----response----");
      //     console.error("status code:");
      //     console.error(error.status);
      //     console.error(error.message);
      //     console.log("--- end of response---");

      // })
      // )
 }
}
