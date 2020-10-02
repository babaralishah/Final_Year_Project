
import { Component, OnInit } from '@angular/core';
import { RestService } from '../Services/rest.service';
import { FileholderService } from '../Services/fileholder.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
  // templateUrl: './Main.component.html',
})
export class MainComponent implements OnInit {

  general_search: string;
  data: any;

  fileToUpload: File = null;
  results: Object;
  constructor(
    public restservice: RestService,
    private FileholderService: FileholderService
  ) { }
  headers1 = ['Algorithm', 'Efficiency'];
  flag = false;
  stringifiedData: any;
  parsedJson: any;
  val: string;
  firstName: string;
  newImage: any;
  FormValue: any;
  receivedFile: File; //  = null;
  todaydate: Date;

  ngOnInit() {
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log('I am \'handleFileInput Function \': \"File dragged but not uploaded yet\"');
  }

  async uploadFile() {

    this.FileholderService.setfile(this.fileToUpload);
    this.restservice.parseTable(this.fileToUpload).subscribe(data => {
      this.results = data[0].data;
      this.data = data;
      console.log('Data: ', this.data);
      console.log('Results: ', this.results);

      // this.router.navigateByUrl('/Visualization');
    });

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
  }
}