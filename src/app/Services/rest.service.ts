import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Results } from '../Results';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    private http: HttpClient) { }


  machineUrl = 'http://127.0.0.1:5000/';
  weatherUrl = 'http://127.0.0.1:5000/weatherReport/';
  // backendAddress = 'http://127.0.0.1:5000/uploader';
  backendAddress = 'http://127.0.0.1:5000/output/';
  backendAddress1 = 'http://127.0.0.1:5000/output1/';

  readMachine() {
    return this.http.get<any>(this.machineUrl);
  }
  //     readWeather(): Observable<Weather[]>{
  //       return this.http.get<Weather[]>(this.weatherUrl);
  //   }
  readResults(): Observable<Results[]> {
    console.log('I am readResult function, having backend response: ');
    return this.http.get<Results[]>(this.backendAddress1, { responseType: 'json' });
  }
  parseTable(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    console.log('I am the ParseTable function in service.ts, \'File and its name: \' ' + fileToUpload + fileToUpload.name);
    return this.http.post(this.backendAddress, formData); // ,{  responseType: 'arraybuffer' | 'blob' | 'json' | 'text' });
  }

  postFile(fileToUpload: File) {
    const endpoint = this.backendAddress;
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    console.log('postFile')
    return this.http.post(endpoint, formData)
  }

}
