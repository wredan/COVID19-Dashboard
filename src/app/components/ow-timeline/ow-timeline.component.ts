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
        this.timelineChartLabels.push(new Date(el.date));
        this.dataset.push(el.new_cases);
      });
      label = 'Daily Cases Distribution';
    } else {
      dataArray.forEach(el => {
        this.timelineChartLabels.push(el.date);
        this.dataset.push(el.new_deaths);
      });
      label = 'Daily Deaths Distribution';
    }

    this.timelineChartData.push( {
      data: this.dataset, 
      label: label, 
      fill: false,
      pointRadius: 0
    })
     
  }

}
