import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
// import { User } from '../login/User';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  private readonly url = 'https://shaisecommercestore.herokuapp.com/api'; // environment.url;

  constructor(private httpClient: HttpClient, public router: Router) { }
  ///////// Function to Register the new user /////////////
  register(user: any): Observable<any> {

    return this.httpClient.post(`${this.url}/users/signup`, user).pipe(
      catchError(this.handleError)
    )
  }
  /////////// Function to Login the already existed user /////////////
  public login(user: any): Observable<any> {
    console.log('Hello', user);
    return this.httpClient.post(`${this.url}/users/login`, user);
    // .subscribe((data: any) => {
    //   localStorage.setItem('access_token', data.token)
    //   this.getUserProfile(data._id).subscribe((data) => {
    //     this.currentUser = data;
    //     this.router.navigate(['users/profile/' + data.msg._id]);
    //   })
    // })
  }
  ///////// Error Handling /////////////////
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
  // ////////////////////////////////////////

}
