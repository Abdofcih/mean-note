import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { Subscription } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';
import { NoteService } from '../services/note.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit,OnDestroy {
  userInfoSubs:Subscription;
  user:User;
  imageUrl: string ;
  image: File;
  counts ={all:0,isfavourite:0};
  constructor(private userService:UserService,
              private noteService:NoteService,
              private authService:AuthService,
              private router:Router,
              public actionSheetController: ActionSheetController) {}
  ngOnInit(){
    this.userInfoSubs = this.userService.readProfile().subscribe(data=>{
      this.user = data;
   },error=>{
     console.log(error)
   })
   this.noteService.countNotes().subscribe(counts=>this.counts=counts,e=>console.log(e))
   
   this.userService.getAvatar(this.authService.currentUserValue._id).subscribe(
    data=>{
      console.log(data)
      this.imageUrl = "https://means-notes-app.herokuapp.com/users/"+this.authService.currentUserValue._id+"/avatar";
    },
    error=>{
      console.log(error)
    }
  )
  }

  async displayOptions(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      buttons: [{
        text: 'Update Profile',
        icon: 'create',
        handler: () => {
          this.router.navigate(['tabs/tab3/update-profile'])
        }
      }, {
        text: 'log Out',
        icon: 'log-out',
        handler: () => {
          this.authService.logout().pipe(take(1))
          .subscribe(data=>console.log(data),err=>console.log(err))
          this.router.navigate(['login'])
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
 
  onImage(event){
    this.image = event.target.files[0];
    //get file form data ready
    const uploadData = new FormData();
    uploadData.append('avatar',  this.image,  this.image.name);
 
    this.userService.addAvatar(uploadData)
  .subscribe((event) => {
    console.log(event);
    this.imageUrl = "https://means-notes-app.herokuapp.com/users/"+this.authService.currentUserValue._id+"/avatar"
  }, error => {
    console.log(error)
  });
  }

  ngOnDestroy(){
    this.userInfoSubs.unsubscribe()
  }
}
