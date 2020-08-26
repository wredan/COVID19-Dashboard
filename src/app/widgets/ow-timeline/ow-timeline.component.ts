import { Component, OnInit, Input, OnChanges } from '@angular/core';
import 'chartjs-plugin-zoom';

@Component({
  selector: 'app-ow-timeline',
  templateUrl: './ow-timeline.component.html',
  styleUrls: ['./ow-timeline.component.scss']
})
export class OwTimelineComponent implements OnInit, OnChanges {

  @Input() data;
  @Input() type;
  @Input() color;

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
    // plugins: {
    //   zoom: {
    //     pan: {
    //       enabled: true,
    //       mode: 'xy'
    //     },
    //     zoom: {
    //       enabled: true,
    //       mode: 'xy'
    //     }
    //   }
    // }
  };

  public timelineChartLabels = [];
  public timelineChartType = 'bar';
  public timelineChartLegend = true;
  public timelineChartData = [];

  ngOnInit() {
    this.timelineChartColors = [
      {
        borderColor: this.color,
        backgroundColor: this.color
      },
    ];
  }

  ngOnChanges(): void {
    let dataArray = this.data.data;   
    let label;
    if(this.type == "cases"){
      dataArray.forEach(el => {
        this.timelineChartLabels.push(el.date);
        this.dataset.push(el.new_cases);
      });
      label = 'Distribuzione Giornaliera Casi';
    } else {
      dataArray.forEach(el => {
        this.timelineChartLabels.push(el.date);
        this.dataset.push(el.new_deaths);
      });
      label = 'Distribuzione Giornaliera Morti';
    }

    this.timelineChartData = [
      {
        data: this.dataset, 
        label: label, 
        fill: false,
        pointRadius: 0
      }
    ];          
  }

}
