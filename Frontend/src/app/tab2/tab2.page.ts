import { Component, OnDestroy, OnInit } from '@angular/core';
import { Note } from '../model/note';
import { NoteService } from '../services/note.service';
import { Subscription } from 'rxjs';
import { Router,NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit,OnDestroy {
  notes:Note[];
  getNotesSubs:Subscription;
  constructor(private noteService:NoteService, private router: Router) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
          // Function you want to call here
          this.getNotesSubs = this.noteService.getAll().subscribe(notes=>this.notes=notes,error=>console.log(error))   
      }
   });
   }
  
 ngOnInit(){  }
 ngOnDestroy(){
   this.getNotesSubs.unsubscribe();
 }
}
