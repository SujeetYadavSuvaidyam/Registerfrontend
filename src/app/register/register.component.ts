import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../service/register.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  preserveWhitespaces: true

})
export class RegisterComponent {
  constructor(private builder: FormBuilder, private httpservice: RegisterService, private toastr: ToastrService, private router: Router) { }
  data: any = []
  ngOnInit() {

  }

  registerform = this.builder.group({
    username: this.builder.control('', Validators.compose([Validators.required])),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    gender: this.builder.control('', Validators.compose([Validators.required])),
  });
  proceedregistration() {
    // this.data.push({
    //   username: this.registerform.controls.username.value,
    //   email: this.registerform.controls.email.value,
    //   password: this.registerform.controls.password.value,
    //   gender: this.registerform.controls.gender.value
    // })


    if (this.registerform.valid) {
      this.httpservice.registerUser(this.registerform.value).pipe(
        catchError((error: any) => {
          let errorMessage;
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          // Display the error message to the user (e.g., using a toaster or an alert)
          console.error(errorMessage); // For debugging purposes
          this.toastr.error(errorMessage)
          return throwError(errorMessage);
        })
      ).subscribe((res) => {
        console.log(res)
        this.toastr.error(res.err)
        this.toastr.success("Registred Successfully"), {
          progressBar: true,
          positionClass: 'toast-top-right'
        }
        this.router.navigate(['/'])
        this.registerform.reset();
      })
    }
    else {
      this.toastr.warning('Please enter valid data')
    }

    // console.log(this.data);

  }
}
