import { Component, OnInit, OnDestroy } from '@angular/core';
import { NoteService } from '../services/note.service';
import { Subscription } from 'rxjs';
import { take, first } from 'rxjs/operators';
import { Note } from '../model/note';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit,OnDestroy {
 buttonText:string = 'Add';
 note:Note={title:""};
 addOrUpdateNoteSubs:Subscription;
 id:string;
  constructor(private noteService:NoteService,
              private route:ActivatedRoute,
              private router:Router,
              private alertCtrl:AlertController) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    // tslint:disable-next-line: curly
    if(this.id){
      this.noteService.getNote(this.id).pipe(take(1)).subscribe(note => this.note = note);
      this.buttonText = 'Update';
    }
      
  }
  submitNote(noteForm){
    console.log(noteForm.value)
    if(this.id)
        this.addOrUpdateNoteSubs =  this.noteService.updateNote(this.id,noteForm.value)
        .subscribe(note=>console.log(note),error=>console.log(error))
    else
       this.addOrUpdateNoteSubs =  this.noteService.addNote(noteForm.value)
       .subscribe(note=>console.log(note),error=>console.log(error))
   this.router.navigate(['/tabs/tab2']);
  }
 async deleteNote(){
  const alert = await this.alertCtrl.create({
    header: 'Confirm!',
    message: 'Are you sure to <strong>Delete</strong>!!!',
    buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.noteService.deleteNote(this.id).pipe(first()).subscribe(d=>console.log,e=>console.log)
            this.router.navigate(['/tabs/tab2']);
          }
        }
      ]
    });
    await alert.present();
  }
  ngOnDestroy(){
    if(this.addOrUpdateNoteSubs) // user may visit the page and won't add a note
         this.addOrUpdateNoteSubs.unsubscribe();
  }
}
