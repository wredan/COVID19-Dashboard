import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges {
  @Input() type;
  @Input() header;
  @Input() data;
  @Input() subtitle;

  public title = "";

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.setData();
  }

  setData() {
    let dataArray = this.data.data;
    let lastDay = dataArray[dataArray.length - 1];
    switch (this.type) {
      case "cases_total":
        this.title = lastDay.total_cases.toLocaleString("en");
        break;
      case "cases_daily":
        this.title = lastDay.new_cases.toLocaleString("en");
        this.header += " - " + new Date(lastDay.timestamp * 1000).toLocaleDateString("it");
        break;
      case "deaths_total":
        this.title = lastDay.total_deaths.toLocaleString("en");
        break;
      case "deaths_daily":
        this.title = lastDay.new_deaths.toLocaleString("en");
        this.header += " - " + new Date(lastDay.timestamp * 1000).toLocaleDateString("it");
        break;
      case "vaccinations_total":
        this.title = lastDay.total_vaccinations.toLocaleString("en");
        break;
      case "vaccinations_fully":
        this.title = lastDay.people_fully_vaccinated.toLocaleString("en");
        break;
      case "vaccinations_daily":
        this.title = lastDay.new_vaccinations.toLocaleString("en");
        this.header += " - " + new Date(lastDay.timestamp * 1000).toLocaleDateString("it");
        break;
      default:
        break;
    }    
  }

}
