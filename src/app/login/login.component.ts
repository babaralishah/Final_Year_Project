import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; // Instance of Form group that will get form data from user end (i.e; login.html)
  // registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  mobileView: boolean;
  username: string;
  email: string;

  constructor(public formBuilder: FormBuilder, // Creating an instance of Formbuilder
    public router: Router,
    public authService: AuthenticationService, // Instance of Authentication services created in front end
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  loginUser() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      
      return;
    }
    console.log('user login data: ', this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(data => {

      console.log("Subscribed Data: ", data);
      const success = data.success;
      const status = data.status;
      // const msg: string = data.msg;
      console.log("Status: " + status);
      console.log("Success: " + success);
      const email = this.loginForm.value.email;
      // const email = this.email;
      if (success) {

        console.log(this.email);
        console.log(email);
        alert('SUCCESS!! :-)')
        this.router.navigate(['profile', email]);
      } else {
        alert('Invalid email or password!');
        // this.router.navigate(['profile', email]);
      }
    });
  }

  // getting input labels values from user end (login.html)
  get f() { return this.loginForm.controls; }
}
