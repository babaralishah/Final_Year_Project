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
  backendData: any
  public doughnutChartLabels = ['S Q1', 'S Q2', 'S Q3', 'S Q4', 'S Q5', 'S Q6'];
  public doughnutChartData = [120, 150, 180, 90, 120, 150, 180, 90];
  public doughnutChartType = 'doughnut';

  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
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

  constructor(
    private FileholderService: FileholderService,
    private restservice: RestService) { }

  ngOnInit(): void {

    // this.addData('bar', 'demale', [1,2,3,4,5,6,7,8,9,11,22,33,44,55,66,77,88,99]);

    // socket.on('data1', (res) => {
    //   this.updateChartData(this.chart, res, 0);
    //   this.updateChartData(this.doughnut, res.slice(0, 5), 0);
    // })

    // socket.on('data2', (res) => {
    //   this.updateChartData(this.chart, res, 1);
    // })

    this.loadVisualzeData();
  }

  loadVisualzeData() {

    var file = this.FileholderService.getfile();
    console.log(file);
    this.restservice.readResults(file)
      .subscribe
      (data => {
        // alert(data)
        this.backendData = data;
        // this.pieChartData = data;
        // this.barChartLabels = this.backendData;
        // this.barChartData = this.backendData;

        // this.doughnutChartData = this.backendData;
        // this.doughnutChartLabels = this.backendData;
        var obj = JSON.parse(this.backendData);

        console.log('Backend Data Json parse: ', obj.age, obj.sex);
        // this.addData1('bar', obj.age);

        // this.doughnutChartData = obj.age;
        setTimeout(() => {

          this.doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4', 'Sales Q5', 'Sales Q6'];
          this.doughnutChartData = [65, 59, 80, 81, 56, 55, 40]
        }, 0);
        // console.log('Server Response: ', data);
      },
        (error) => {
          console.log('No Data Found of Visualization' + error);
        }
      );

  }
}
