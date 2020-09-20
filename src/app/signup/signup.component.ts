import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from "../authentication.service";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  submitted = false;
  registerForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
    public authService: AuthenticationService,
    public router: Router) { }

  ngOnInit(): void {
    this.initialize();
  }
  initialize() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  registerUser() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log('Erroneous')
      return;
    }
    this.authService.register(this.registerForm.value).subscribe((data) => {
      console.log(data);
      // this.registerresponse = data;
      const email = this.registerForm.value.email;
      const msg = data.msg;
      const status = data.status;
      // console.log('Status: ' + status);
      if (status) {
        this.registerForm.reset();

        alert(msg);
        this.router.navigate(['Home']);
      }
      else {
        alert(msg);
      }
    })
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
}
