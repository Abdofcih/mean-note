import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { User } from '../model/user';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {
  isValidAge:boolean = true;
  userInfoSubs:Subscription;
  user:User;
  constructor( 
    private router: Router,
    private route: ActivatedRoute,
    private userService:UserService) { }

  ngOnInit() {
    this.userInfoSubs = this.userService.readProfile().subscribe(data=>{
      this.user = data;
   },error=>{
     console.log(error)
   })
  }
  submitUpdate(uF){
     this.userService.updateProfile(uF.value).pipe(first()).subscribe(data=>console.log(data),e=>console.log(e));
      this.router.navigate(['/tabs/tab3'])
    }
validateAge(age:number){ this.isValidAge =  (10<age && age<100)? true: false;}
ngOnDestroy(){
  this.userInfoSubs.unsubscribe();
}
}
