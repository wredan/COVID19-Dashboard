import { Component, OnInit, Input, OnChanges} from '@angular/core';
import { StatsService } from '../../../services/stats.service';

@Component({
  selector: 'app-regrlin-chart',
  templateUrl: './regrlin-chart.component.html',
  styleUrls: ['./regrlin-chart.component.scss']
})
export class RegrlinChartComponent implements OnInit, OnChanges {

  @Input() data;
  @Input() type;
  @Input() color;
  @Input() heigth;

  public dataset = [];
  public regrlinChartColors = [];
  public regrlinChartOptions = {
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

  public regrlinChartLabels = [];
  public regrlinChartType = 'line';
  public regrlinChartLegend = true;
  public regrlinChartData = [];

  constructor(private statsManager: StatsService) { }

  ngOnInit() {

  }

  ngOnChanges(): void {
    this.data.data.forEach(el => {
      this.regrlinChartLabels.push(el.date);
    });
    this.setLinearRegressionData(this.data.data);
    this.setCases(this.data.data);  
  }

    setCases(data) {
    let dataset = [];
    data.forEach(el => {
      dataset.push(el.new_cases);
    });

    this.regrlinChartData.push({
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

  setLinearRegressionData(data) {
    let dataTimestamp = [];
    let dataset = [];
    data.forEach(el => {
      dataTimestamp.push(el.timestamp);
      dataset.push(el.new_cases);
    });

    let drawPoints = this.statsManager.getRegrLinDrawPoints(
      dataTimestamp,
      this.statsManager.coeffM(dataTimestamp, dataset),
      this.statsManager.coeffQ(dataTimestamp, dataset),
    );

    this.regrlinChartData.push({
      data: [
        { x: new Date(drawPoints[0].x * 1000), y: drawPoints[0].y },
        { x: new Date(drawPoints[1].x * 1000), y: drawPoints[1].y },
      ],
      label: "Retta di Regressione y=mx+q",
      fill: false,
      showLine: true,
      borderDash: [10, 10],
      borderColor: "#FFC107",
      pointRadius: 0,
      order: 1
    });

  }

}
