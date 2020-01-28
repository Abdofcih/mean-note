import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
 isValidAge:boolean = true;
 loading = false;
 submitted = false;
 returnUrl: string;
 error = '';
 constructor(private authenticationService: AuthService, 
  private router: Router,
  private route: ActivatedRoute) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  submitSignup(lF){
      this.loading = true;
      const val = lF.value;
      this.authenticationService.signup(val)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                if(error.error.errors)
                 this.error = error.error.errors.age.message
                 if(error.error.keyPattern)
                 this.error = "Email is exist"
                  this.loading = false;
              });
  }
  validateAge(age:number){ this.isValidAge =  (10<age && age<100)? true: false;}
}
