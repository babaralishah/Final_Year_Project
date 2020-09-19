import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  submitted = false;
  registerForm: FormGroup;
  mobileView: boolean;

  constructor(public formBuilder: FormBuilder,
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

    alert('User Successfully Registered!! :-)\n')

    this.router.navigate(['/Home']);
    console.log(this.registerForm.value);
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
}
