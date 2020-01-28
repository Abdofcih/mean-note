import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
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
  // submitLogin(lF){
  //   const val = lF.value;
  //   console.log(lF.value);
  //   // this.authService.login(val.email, val.password)
  //   // .subscribe(
  //   //     () => {
  //   //         console.log("User is logged in");
  //   //         this.router.navigateByUrl('/');
  //   //     }
  //   // );
  // }
  submitLogin(lF) {
    this.loading = true;
    const val = lF.value;
    this.authenticationService.login(val.email, val.password)
        .pipe(first())
        .subscribe(
            data => {
              console.log(data)
                this.router.navigate([this.returnUrl]);
            },
            error => {
              console.log(error)
                this.error = error;
                this.loading = false;
            });
  }
}
