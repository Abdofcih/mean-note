import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { Subscription } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';
import { NoteService } from '../services/note.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs/operators';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit,OnDestroy {
  userInfoSubs:Subscription;
  user:User;
  imageResponse: any;
  counts ={all:0,isfavourite:0};
  constructor(private userService:UserService,
              private noteService:NoteService,
              private authService:AuthService,
              private router:Router,
              public actionSheetController: ActionSheetController,
              private imagePicker: ImagePicker) {}
  ngOnInit(){
    this.userInfoSubs = this.userService.readProfile().subscribe(data=>{
      this.user = data;
   },error=>{
     console.log(error)
   })
   this.noteService.countNotes().subscribe(counts=>this.counts=counts,e=>console.log(e))
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

  onImage(){
    let Options = {
      width:150,
      quality:50,
      outputType: 1
    }
    this.imageResponse = [];
    this.imagePicker.getPictures(Options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
          this.imageResponse.push('data:image/jpeg;base64,' + results[i]);
      }
    }, (err) => { console.log('Image URI: ' + err )});
  }
  ngOnDestroy(){
    this.userInfoSubs.unsubscribe()
  }
}
