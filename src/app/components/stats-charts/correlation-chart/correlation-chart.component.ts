import { Component, OnInit, Input, OnChanges } from '@angular/core';

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
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'day'
        },
        dysplay: true,
        ticks: {
          min: new Date().setMonth(new Date().getMonth() - 2),
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
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          return Number(tooltipItem.value).toLocaleString('en-US');
        },
      }
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy'
        },
        zoom: {
          enabled: true,
          mode: 'xy'
        }
      }
    }
  };

  public correlationChartLabels = [];
  public correlationChartType = 'line';
  public correlationChartLegend = true;
  public correlationChartData = [];

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(): void {
    this.data.data.forEach(el => {
      this.correlationChartLabels.push(new Date(el.date));
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
      label: 'Daily Cases Distribution',
      fill: false,
      borderColor: "#1976D2",
      pointBackgroundColor: '#1976D2',
      pointBorderColor: '#1976D2',
      pointRadius: 4,
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
      label: "Daily Tests Distribution",
      fill: false,
      borderColor: "#388E3C",
      pointBackgroundColor: '#388E3C',
      pointBorderColor: '#388E3C',
      pointRadius: 4,
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
      label: 'Daily Death Distribution',
      fill: false,
      borderColor: "#D32F2F",
      pointBackgroundColor: '#D32F2F',
      pointBorderColor: '#D32F2F',
      pointRadius: 4,
      order: 1
    })
  }
}
