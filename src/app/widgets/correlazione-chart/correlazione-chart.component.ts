import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { StatsService } from '../../services/stats.service';

@Component({
  selector: 'app-correlazione-chart',
  templateUrl: './correlazione-chart.component.html',
  styleUrls: ['./correlazione-chart.component.scss']
})
export class CorrelazioneChartComponent implements OnInit, OnChanges {

  @Input() data;
  @Input() type;
  @Input() heigth;

  public dataset = [];
  public timelineChartColors = [];
  public timelineChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'month'
        }
      }]
    }
  };

  public timelineChartLabels = [];
  public timelineChartType = 'line';
  public timelineChartLegend = true;
  public timelineChartData = [];

  constructor(private statsManager: StatsService) { }

  ngOnInit() {

  }

  ngOnChanges(): void {
    this.data.data.forEach(el => {
      this.timelineChartLabels.push(el.date);
    });
    switch (this.type) {
      case "cases":
        this.setCases(this.data.data);
        break;
      

      default:
        break;
    }
  }
}
