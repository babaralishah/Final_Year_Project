import { Component, OnInit } from '@angular/core';
import { RestService } from '../Services/rest.service';
import { FileholderService } from '../Services/fileholder.service';
import { Chart } from 'chart.js';

// import io from 'socket.io-client';

// const socket = io('http://localhost:3000');
@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit {

  chart;
  chart2 = [];
  pie: any;
  doughnut: any;

  data1 = [];
  ////////////////////////////////////////////////////
  backendData: any;
  public doughnutChartLabels = ['S Q1', 'S Q2', 'S Q3', 'S Q4', 'S Q5', 'S Q6'];
  public doughnutChartData = [120, 150, 180, 90, 120, 150, 180, 90];
  public doughnutChartType = 'doughnut';

  public barChartLabels = ['Male', 'Female'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [1, 3, 4, 5, 12, 14, 17, 20], label: 'Sex' },
    { data: [1, 3, 4, 5, 12, 14, 17, 18], label: 'Series B' }
  ];

  public pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public pieChartData = [120, 150, 180, 90];
  public pieChartType = 'pie';

  public radarChartLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
  public radarChartData = [
    { data: [120, 130, 180, 70], label: '2017' },
    { data: [90, 150, 200, 45], label: '2018' }
  ];
  public radarChartType = 'radar';
  lastColumn: any;
  data: any;

  constructor(
    // private FileholderService: FileholderService,
    private restservice: RestService) { }

  ngOnInit(): void {

    this.loadVisualzeData();
  }

  // tslint:disable-next-line: typedef
  loadVisualzeData() {
    this.restservice.readResults()
      .subscribe
      (data => {
        this.backendData = data;
        // var obj = JSON.parse(this.backendData);
        console.log('Backend Data Json parse: ', this.backendData[0]);
      },
        (error) => {
          console.log('No Data Found of Visualization' + error);
        }
      );

  }

  // tslint:disable-next-line: typedef
  sendData(name: string) {
    console.log('Calling send data');
    this.restservice.readResults2(name).subscribe((data: any) => {
      // this.data = data;
      console.log('\nreceived data', data);
      console.log('\ncol_categories data at [0]: ', data[0]);
      console.log('\nparticualr_column data at [1]: ', data[1]);
      console.log('\nX_data data at [2]: ', data[2]);
      console.log('\ny_data data at [3]: ', data[3]);

      const arr = data[0].split('\n');
      // tslint:disable-next-line: one-variable-per-declaration
      const catArr = [], lengthArr = [];
      arr.forEach(element => {
        const dataSplit = element.split(' ');

        catArr.push(dataSplit[0]);
        lengthArr.push(dataSplit[dataSplit.length - 1]);
      });
      console.log(catArr);
      console.log(lengthArr);

      setTimeout(() => {
        const labels = [];
        for (let i = 0; i < lengthArr.length; i++) {
          const label = catArr[i] + ' - ' + lengthArr[i];
          labels.push(label);
        }
        console.log('\nlets assign the values\n');
        this.doughnutChartLabels = labels;
        this.barChartLabels = labels;
        this.pieChartLabels = labels;
        this.radarChartLabels = labels;
        // this.barChartData = labels;
        console.log('\nDone\n');
      }, 2000);
    });

  }
}
