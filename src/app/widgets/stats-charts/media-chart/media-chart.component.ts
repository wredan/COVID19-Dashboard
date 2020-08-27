import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { StatsService } from '../../../services/stats.service';

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
    responsive: true
  };

  public mediaChartLabels = [];
  public mediaChartType = 'bar';
  public mediaChartLegend = true;
  public mediaChartData = [];

  constructor(private statsManager: StatsService) { }

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
     this.mediaChartLabels.push(data[i].date);
    }
    this.mediaChartType = 'bar';
    this.mediaChartData = [{
      data: medie,
      label: "Media",
      backgroundColor: "#FF9800",
    }];
  }
}