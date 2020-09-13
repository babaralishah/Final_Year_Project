import { Component, OnInit } from '@angular/core';
import { Results } from '../Results';
import { RestService } from '../Services/rest.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
  // templateUrl: './Main.component.html',
})
export class MainComponent implements OnInit {
  // [x: string]: any;
  fileToUpload: File = null;
  // data: any[];
  results: Object;
  data: Object = {};
  constructor(public restservice: RestService) { }
  headers1 = ['Algorithm', 'Efficiency'];
  // results: Results;
  flag = false;
  stringifiedData: any;
  parsedJson: any;
  val: string;
  firstName: string;
  newImage: any;
  FormValue: any;
  algos = [
    'Linear Regression',
    'KNN',
    'Naive Bayes',
    'SVM',
    'Decision Tree',
    'Logistic Regression',
    'Random Forest'
  ];
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

  handleFileInput1(files: FileList) {
    console.log('handleFileInput1')
    this.fileToUpload = files.item(0);
    this.uploadFileToActivity();
  }
  uploadFileToActivity() {
    console.log('uploadFileToActivity')
    this.restservice.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success

      console.log('uploadFileToActivity 02')
    }, error => {
      console.log(error);
    });
  }

  uploadFile() {

    console.log('Upload file function here')
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
      // this.myFunction();
    });
  }
  myFunction() {
    this.restservice.readResults()
      .subscribe
      (data => {
        // tslint:disable-next-line:no-string-literal
        // this.results = data[0]['data'];
        console.log('Server Response: ', data);
        // this.results = data;
        this.results = data[0]['data'];
        this.data = data;
        console.log('Data table: ', this.data);
        console.log('Result table: ', this.results);
      },
        (error) => {
          console.log('No Data Found of Results' + error);
        }
      );
    // setInterval(() => {
    // }, 1400);

  }
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
}

