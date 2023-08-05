import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  preserveWhitespaces: true

})
export class LoginComponent {
  constructor(private builder: FormBuilder, private httpservice: LoginService, private toastr: ToastrService, private router: Router) { }
  data: any = []
  ngOnInit() {

  }

  loginform = this.builder.group({
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    gender: this.builder.control('', Validators.compose([Validators.required])),
  });
  proceedlogin() {
    // this.data.push({
    //   email: this.loginform.controls.email.value,
    //   password: this.loginform.controls.password.value,
    //   gender: this.loginform.controls.gender.value
    // })
    // console.log(this.data);
    if (this.loginform.valid) {
      this.httpservice.loginUser(this.loginform.value).pipe(
        catchError((error: any) => {
          let errorMessage = 'Invailed User';
          // Display the error message to the user (e.g., using a toaster or an alert)
          console.error(errorMessage);
          this.toastr.error(errorMessage);
          return throwError(errorMessage);
        })
      ).subscribe((res) => {
        console.log(res)
        JSON.stringify(localStorage.setItem('token', res.token))
        this.toastr.success("Login Successfully"), {
          progressBar: true,
          positionClass: 'toast-top-right',
        }
        this.router.navigate(['/home'])
      })
    } else {
      this.toastr.warning('Please enter valid data')
    }
    this.loginform.reset();
  };
}
