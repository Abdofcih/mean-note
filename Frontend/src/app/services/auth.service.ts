import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../model/user';
import {environment} from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
//  dummyUser:User = {name:"a",email:"aa@ff.com",password:'12345678',age:25}
  constructor(private http: HttpClient) {//
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiBaseUrl}/users/login`, { email, password })
        .pipe(map(data => {
            // login successful if there's a jwt token in the response
            if (data && data.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                let user = data.user;
                let token = data.token;
                console.log("logged"+user)

                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('token', token);
                this.currentUserSubject.next(user);
            }
            return data;
        }));
}
signup(user:User) {
  return this.http.post<any>(`${environment.apiBaseUrl}/users`, user)
      .pipe(map(data => {
          // login successful if there's a jwt token in the response
          if (data && data.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              let user = data.newUser;
              let token = data.token;
              localStorage.setItem('currentUser', JSON.stringify(user));
              localStorage.setItem('token', token);
              this.currentUserSubject.next(user);
          }
          return data;
      }));
}
logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    return this.http.post<any>(`${environment.apiBaseUrl}/users/logout`,null)
}
 public isLoggedIn() {
  return false;
}

isLoggedOut() {
  return !this.isLoggedIn();
}


}
