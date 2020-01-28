import { Injectable } from '@angular/core';
import { User } from '../model/user';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  readProfile():Observable<User>{
    return this.http.get<User>(`${environment.apiBaseUrl}/users/me`)
  }
  updateProfile(body){
    return this.http.patch<any>(`${environment.apiBaseUrl}/users/me`,body)
  }
  deleteProfile(){
    return this.http.delete<any>(`${environment.apiBaseUrl}/users/me`)
  }
  addAvatar(avatar){
    return this.http.post<any>(`${environment.apiBaseUrl}/users/me/avatar`,{avatar})
  }
  getAvatar(avatar){
    return this.http.get<any>(`${environment.apiBaseUrl}/users/me/avatar`)
  }

}
