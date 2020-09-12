import { Component, OnInit } from '@angular/core';
import { Results } from '../Results';
import { RestService } from '../Services/rest.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-main',
  template: `
  <body>
      <div style="text-align:center">
        <div>
          <br />
          <input #fileInput name="file" type="file"  (change)="handleFileInput($event.target.files)" >
<button mat-raised-button class="standard-button" (click)="uploadFile()">Upload file</button>
          <br />
  
          <div>
            <br />
            <br />
            Select an Algorithm :
            <select>
              <option *ngFor="let i of algos">{{ i }}</option>
            </select>
          </div>
          <div>
          <br />
          <input name="btn" type="submit" >
<button mat-raised-button class="standard-button" (click)="myFunction()">predict it</button>
          <br />
</div>
          <br />

          <table id="results">
    <tr>
        <th *ngFor="let column of headers1">
            {{column}}
        </th>
    </tr>

    <tr *ngFor="let row of results">
        <td *ngFor="let col of headers1">
            {{row[col]}}
        </td>
    </tr>
    <div class="form-group">
    <label for="file">Choose File</label>
    <input type="file"
           id="file"
           (change)="handleFileInput1($event.target.files)">
</div>
</table>
          <br />
          <!-- Algorithms Accuracy Result : <input [(ngModel)]="val" /> <br /><br /> -->
          <br />
          Algorithm Visualization: {{ val }}
            <br />
            <br />

          <br />
        </div>
      </div>
    </body>
  `,
  styleUrls: ['./main.component.css']
  // templateUrl: './Main.component.html',
})
export class MainComponent implements OnInit {
  [x: string]: any;
  fileToUpload: File = null;
  constructor(public restservice: RestService) { }
  headers1 = ['Algorithm', 'Efficiency'];
  results: Results;
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

    this.restservice.parseTable(this.fileToUpload).subscribe(data => {
      // data is the response that we would receive in return to the function call
      console.log('I am \'uploadFile function in main.ts, \' \"Data i am getting from response of post file request:\"' + data);
      // this.results = data;
      this.results = data[0]['this.data'];
    });
  }
  // setInterval(() => {
  // }, 1400);
  myFunction() {
    this.restservice.readResults()
      .subscribe
      (data => {
        // tslint:disable-next-line:no-string-literal
        // this.results = data[0]['data'];
        console.log('Server Response: ', data);
      },
        (error) => {
          console.log('No Data Found of Results' + error);
        }
      );
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

