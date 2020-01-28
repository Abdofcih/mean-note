import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'src/app/model/note';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit {
  @Input() notes:Note[];
  constructor() { }

  ngOnInit() {}

}
