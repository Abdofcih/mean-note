import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteListComponent } from '../note-list/note-list.component';
import { NoteComponent } from '../note/note.component';


@NgModule({
  declarations: [NoteListComponent,NoteComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,],
  exports:[NoteListComponent,NoteComponent,IonicModule,CommonModule,FormsModule]
})
export class SharedModule { }
