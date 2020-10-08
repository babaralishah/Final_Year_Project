import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
  chartForm: FormGroup;
  chartname;
  chart;
  chart2 = [];
  pie: any;
  doughnut: any;
  data1;
  data2;
  // data1 = [];
  ////////////////////////////////////////////////////
  backendData: any;
  public doughnutChartLabels = [];
  public doughnutChartData = [];
  public doughnutChartType = 'doughnut';

  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [];

  public pieChartLabels = [];
  public pieChartData = [];
  public pieChartType = 'pie';

  public radarChartLabels = [];
  public radarChartData = [];
  public radarChartType = 'radar';
  lastColumn: any;
  data: any;

  constructor(private formBuilder: FormBuilder,
    // private FileholderService: FileholderService,
              private restservice: RestService) { }

  ngOnInit(): void {
    this.initialize();
    this.loadVisualzeData();
  }
  // tslint:disable-next-line: typedef
  initialize() {
    this.chartForm = this.formBuilder.group({
      name1: [],
      name2: []
      // password: ['', [Validators.required, Validators.minLength(6)]]
    });
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
  checkChart(chart) {
    console.log(chart);
    this.chartname = chart;
  }
  // tslint:disable-next-line: typedef
  sendData(name1, name2) {
    console.log('Calling send data');
    console.log(name1);
    this.restservice.readResults2(name1).subscribe((data: any) => {
      const object1 = JSON.parse(data[1]);
      const object2 = JSON.parse(data[2]);
      const arr1 = [];
      const arr2 = [];

      let count = 0;
      // tslint:disable-next-line: forin
      for (const property in Object.values(object1)) {
        const obj = { cat: null, length: 0, avg: 0 };
        if (!arr1.includes(object1[property])) {
          arr1.push(object1[property]);
          obj.cat = object1[property];
          obj.length++;
          obj.avg = object2[property];
          arr2.push(obj);
        } else {
          // tslint:disable-next-line: no-shadowed-variable
          for (const arr of arr2) {
            // tslint:disable-next-line: triple-equals
            if (arr.cat == object1[property]) {
              const sum = arr.avg * arr.length + object2[property];
              arr.length++;
              arr.avg = sum / arr.length;
            }
          }
        }
        count++;
      }

      const arr = data[0].split('\n');
      // tslint:disable-next-line: one-variable-per-declaration
      const catArr = [], lengthArr = [], avgArr = [];
      arr.forEach(element => {
        const dataSplit = element.split(' ');

        catArr.push(dataSplit[0]);
        lengthArr.push(dataSplit[dataSplit.length - 1]);
      });
      arr2.forEach(element => {
        avgArr.push(element.avg);
      });
      console.log(catArr);
      console.log(lengthArr);
      console.log(avgArr);

      setTimeout(() => {
        const labels = [];
        const complexArr = [];
        for (let i = 0; i < lengthArr.length; i++) {
          const label = catArr[i] + ' - ' + lengthArr[i];
          labels.push(label);

          const innerData = { data: [], label: catArr[i] };
          // tslint:disable-next-line: prefer-for-of
          for (let j = 0; j < lengthArr.length; j++) {
            innerData.data.push(0);
          }
          innerData.data.splice(i, 1, avgArr[i]);
          complexArr.push(innerData);
        }
        console.log(complexArr);


        console.log('\nlets assign the values\n');
        this.doughnutChartLabels = labels;
        this.doughnutChartData = avgArr;
        this.pieChartLabels = labels;
        this.pieChartData = avgArr;
        this.barChartLabels = labels;
        this.barChartData = complexArr;
        this.radarChartLabels = labels;
        this.radarChartData = complexArr;
        // this.barChartData = labels;
        console.log('\nDone\n');
      });
    });

  }
}
