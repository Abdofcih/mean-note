import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../model/note';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
@Injectable({ providedIn: 'root' })
export class NoteService {
    constructor(private http: HttpClient) { }
    addNote(note){
      return this.http.post<Note>(`${environment.apiBaseUrl}/notes`,note);
    }
    getAll(favourite?:boolean) {
        let filters = '';
        if(favourite)
        filters += 'favourite=true'
        return this.http.get<Note[]>(`${environment.apiBaseUrl}/notes?${filters}`);
    }
    getNote(id:string) {
      return this.http.get<Note>(`${environment.apiBaseUrl}/notes/${id}`);
    }
   updateNote(id:string,body) {
    return this.http.patch<Note>(`${environment.apiBaseUrl}/notes/${id}`,body);
    }
   deleteNote(id:string) {
    return this.http.delete<Note>(`${environment.apiBaseUrl}/notes/${id}`);
   }
countNotes(){
  return this.http.get<{all,isfavourite}>(`${environment.apiBaseUrl}/notes/count`)
}
}