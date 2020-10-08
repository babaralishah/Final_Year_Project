
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    private http: HttpClient) { }

  backendAddress = 'http://127.0.0.1:5000/output/';
  backendAddress1 = 'http://127.0.0.1:5000/output1/';
  backendAddress2 = 'http://127.0.0.1:5000/output2/';

  // tslint:disable-next-line: typedef
  readResults() {
    return this.http.get(this.backendAddress1);
  }

  // tslint:disable-next-line: typedef
  readResults2(name1) {
    console.log(name1);
    return this.http.post(this.backendAddress2, name1);
  }

  // tslint:disable-next-line: typedef
  parseTable(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    console.log('File Name: ', fileToUpload.name); // and File and its name: \' ' + fileToUpload + fileToUpload.name);
    return this.http.post(this.backendAddress, formData); // ,{  responseType: 'arraybuffer' | 'blob' | 'json' | 'text' });
  }

}
