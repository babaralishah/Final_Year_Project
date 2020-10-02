
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

  readResults() {
    // const formData: FormData = new FormData();
    // formData.append('file', file, file.name);
    // console.log('File Name: ', file.name);
    // return this.http.post(this.backendAddress1, formData); 
    return this.http.get(this.backendAddress1); 
  }

  readResults2(name:string) {
    console.log(name)
    return this.http.post(this.backendAddress2, name); 
  }

  parseTable(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    console.log('File Name: ', fileToUpload.name); // and File and its name: \' ' + fileToUpload + fileToUpload.name);
    return this.http.post(this.backendAddress, formData); // ,{  responseType: 'arraybuffer' | 'blob' | 'json' | 'text' });
  }

}
