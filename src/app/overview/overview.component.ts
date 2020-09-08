import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../services/data-manager.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  public data;
  showSpinner = true;

  constructor(private dataManger: DataManagerService) { }

  ngOnInit(): void {
    this.dataManger.getCovidCountryData("OWID_WRL").subscribe(
      res => {
        this.data = res["data"];
        this.showSpinner = false;
      },
      err => {
        console.log(err);
      }
    );
  }

}
