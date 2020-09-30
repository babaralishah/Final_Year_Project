
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Component, Inject, OnInit } from '@angular/core';
// import { Results } from '../Results';
import { RestService } from '../Services/rest.service';
import { FileholderService } from '../Services/fileholder.service';
import { UploadfirebaseService } from '../Services/uploadfirebase.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
  // templateUrl: './Main.component.html',
})
export class MainComponent implements OnInit {

  general_search: string;
  data: any;

  // [x: string]: any;
  fileToUpload: File = null;
  // data: any[];
  results: Object;
  // data: Object = {};
  constructor(
    private router: Router,
    public restservice: RestService,
    private UploadfirebaseService: UploadfirebaseService,
    private FileholderService: FileholderService,
    @Inject(AngularFireDatabase) private firebase: AngularFireDatabase) { }
  headers1 = ['Algorithm', 'Efficiency'];
  // results: Results;
  flag = false;
  stringifiedData: any;
  parsedJson: any;
  val: string;
  firstName: string;
  newImage: any;
  FormValue: any;
  receivedFile: File; //  = null;
  todaydate: Date;

  // @ViewChild('fileInput') fileInput;
  ngOnInit() {
    // this.myFunction();
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log('I am \'handleFileInput Function \': \"File dragged but not uploaded yet\"');
  }

  async uploadFile() {

    //Calling service for firebase
    
    // const obs = await this.UploadfirebaseService.uploadProfileImg(
    //   {
    //     file: this.fileToUpload
    //   }
    // );
    // obs.subscribe(
    //   url => {
    //     console.log(url);
    //     localStorage.setItem('fileUrl', JSON.stringify(url));
    //   }
    // );

    // Calling the service to pass the data file between other components such as visualization component 
    this.FileholderService.setfile(this.fileToUpload);
    this.restservice.parseTable(this.fileToUpload).subscribe(data => {
      // data is the response that we would receive in return to the function call
      console.log('File to Upload:\t', this.fileToUpload);
      console.log('Subscribed data of upload function: ', data);
      // this.results = data; 
      this.results = data[0].data;
      this.data = data;
      // this.results = data[0]['this.data'];
      console.log('Data: ', this.data);
      console.log('Results: ', this.results);

      // this.router.navigateByUrl('/Visualization');

      // this.myFunction();
    });
  }
}
  // myFunction() {
  //   this.restservice.readResults()
  //     .subscribe
  //     (data => {
  //       // tslint:disable-next-line:no-string-literal
  //       // this.results = data[0]['data'];
  //       console.log('Server Response: ', data);
  //       // this.results = data;
  //       // this.results = data[0]['data'];
  //       // this.data = data;
  //       console.log('Data table: ', this.data);
  //       console.log('Result table: ', this.results);
  //     },
  //       (error) => {
  //         console.log('No Data Found of Results' + error);
  //       }
  //     );
  //   // setInterval(() => {
  //   // }, 1400);

  // }
  //   uploadFile1(event) {
  //     console.log('Inside File uploadFile1');
  //     const fileEvnet = event.target.files[0];

  //     console.log(fileEvnet);
  //     this.newImage = fileEvnet;

  //     const uploadData = new FormData();
  //     // uploadData.append('file', fileItem);
  //     this.imageData = event.value;
  //     const reader = new FileReader(); // HTML5 FileReader API
  //     const file = event.target.files[0];
  //     this.FormValue = uploadData;
  //     if (event.target.files && event.target.files[0]) {
  //       reader.readAsDataURL(file);
  //   }
  // }


  // handleFileInput1(files: FileList) {
  //   console.log('handleFileInput1')
  //   this.fileToUpload = files.item(0);
  //   this.uploadFileToActivity();
  // }
  // uploadFileToActivity() {
  //   console.log('uploadFileToActivity')
  //   this.restservice.postFile(this.fileToUpload).subscribe(data => {
  //     // do something, if upload success

  //     console.log('uploadFileToActivity 02')
  //   }, error => {
  //     console.log(error);
  //   });
  // }
