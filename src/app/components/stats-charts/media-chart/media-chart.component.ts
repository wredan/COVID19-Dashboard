import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-media-chart',
  templateUrl: './media-chart.component.html',
  styleUrls: ['./media-chart.component.scss']
})
export class MediaChartComponent implements OnInit, OnChanges {

  @Input() data;
  @Input() days;
  @Input() heigth;

  public giorni = [7, 15, 30, 60, 90];
  public dataset = [];
  public mediaChartOptions = {
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
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          return Number(Number(tooltipItem.value).toFixed(2)).toLocaleString("en-US");
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

  public mediaChartLabels = [];
  public mediaChartType = 'bar';
  public mediaChartLegend = true;
  public mediaChartData = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(): void {   
    this.getMedia();
  }

  getMedia() {
    let data = this.data.data;
    let medie = [];
    this.mediaChartLabels = [];
    for(let i=this.days - 1; i < data.length; i++){
      let sum = 0;
      for(let j = 0; j < this.days; j++){
       sum += data[i-j].new_cases;
      }
     medie.push(sum/this.days);
     this.mediaChartLabels.push(new Date(data[i].date));
    }
    this.mediaChartType = 'bar';
    this.mediaChartData = [{
      data: medie? medie : [],
      label: "Average",
      backgroundColor: "#FF9800",
    }];
  }
}