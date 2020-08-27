import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { StatsService } from '../../../services/stats.service';

@Component({
  selector: 'app-correlation-chart',
  templateUrl: './correlation-chart.component.html',
  styleUrls: ['./correlation-chart.component.scss']
})
export class CorrelationChartComponent implements OnInit, OnChanges {

  @Input() data;
  @Input() type;
  @Input() color;
  @Input() heigth;
  @Input() title;

  public dataset = [];
  public correlationChartColors = [];
  public correlationChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'month'
        }
      }],
      yAxes: [{
        id: 'A',
        type: 'linear',
        position: 'left',
      }, {
        id: 'B',
        type: 'linear',
        position: 'right'       
      }]
    }
  };

  public correlationChartLabels = [];
  public correlationChartType = 'line';
  public correlationChartLegend = true;
  public correlationChartData = [];

  constructor(private statsManager: StatsService) { }

  ngOnInit() {

  }

  ngOnChanges(): void {
    this.data.data.forEach(el => {
      this.correlationChartLabels.push(el.date);
    });
    this.setCases(this.data.data);
    if(this.type == "correlation_cases_tests"){
      this.setTests(this.data.data); 
    } else if(this.type == "correlation_cases_deaths") {
      this.setDeath(this.data.data);
    }   
  }

    setCases(data) {
    let dataset = [];
    data.forEach(el => {
      dataset.push(el.new_cases);
    });

    this.correlationChartData.push({
      yAxisID: 'A',
      data: dataset,
      label: 'Distribuzione Giornaliera Casi',
      fill: false,
      borderColor: "#1976D2",
      pointBackgroundColor: '#1976D2',
      pointBorderColor: '#1976D2',
      pointRadius: 1,
      order: 1
    });
  }

  setTests(data) {
    let dataset = [];
    data.forEach(el => {
      dataset.push(el.new_tests);
    });

    this.correlationChartData.push({
      yAxisID: 'B',
      data: dataset ? dataset : [],
      label: "Distribuzione giornaliera tamponi",
      fill: false,
      borderColor: "#388E3C",
      pointBackgroundColor: '#388E3C',
      pointBorderColor: '#388E3C',
      pointRadius: 1,
      order: 1
    });
  }

  setDeath(data) {
    let dataset = [];
    data.forEach(el => {
      dataset.push(el.new_deaths);
    });

    this.correlationChartData.push({
      yAxisID: 'B',
      data: dataset,
      label: 'Distribuzione Giornaliera Morti',
      fill: false,
      borderColor: "#D32F2F",
      pointBackgroundColor: '#D32F2F',
      pointBorderColor: '#D32F2F',
      pointRadius: 1,
      order: 1
    })
  }
}
