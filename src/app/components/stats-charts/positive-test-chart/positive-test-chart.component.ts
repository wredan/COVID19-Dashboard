import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { StatsService } from '../../../services/stats/stats.service';

@Component({
  selector: 'app-positive-test-chart',
  templateUrl: './positive-test-chart.component.html',
  styleUrls: ['./positive-test-chart.component.scss']
})
export class PositiveTestChartComponent implements OnInit, OnChanges {

  @Input() data;
  @Input() heigth;

  public dataset = [];
  public testChartOptions = {
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
        ticks: {
            callback: function(value, index, values) {
                return value + "%";
            }
        }
    }]
    }
  };

  public testChartLabels = [];
  public testChartType = 'line';
  public testChartLegend = true;
  public testChartData = [];

  constructor(private statsManager: StatsService) { }

  ngOnInit() {
  }

  ngOnChanges(): void {   
    this.setPositiveTests();
  }

  setPositiveTests() {
    let data = this.data.data;
    let dataset = [];
    data.forEach(el => {
      this.testChartLabels.push(el.date);
      dataset.push(el.positive_rate*100);
    });

    this.testChartData.push({
      data: dataset ? dataset : [],
      label: "Positive Rate",
      fill: false,
      borderColor: "#388E3C",
      pointBackgroundColor: '#388E3C',
      pointBorderColor: '#388E3C',
      pointRadius: 1,
      order: 1
    });
  }
}