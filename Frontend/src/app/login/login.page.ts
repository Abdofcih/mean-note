import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
view = 'logIn';
switchTextTo = 'Sign Up';
  constructor() { }

  ngOnInit() {
  }
  switchForms(){
    if(this.view === 'signUp'){
      this.view ='logIn';
      this.switchTextTo = 'Sign Up'
    }
    else{
      this.view ='signUp';
      this.switchTextTo = 'Log In'
    }
  }
}
