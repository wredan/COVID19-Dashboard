import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../../services/data-manager/data-manager.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  public data;
  showSpinner = true;

  constructor(
    private dataManger: DataManagerService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.dataManger.getCovidCountryData("OWID_WRL").subscribe(
      res => {
        this.data = res["data"];
        this.showSpinner = false;
      },
      err => {
        this.snackBar.open("A server connection error has occurred!" , "Ok", { panelClass: 'error-dialog' });
      }
    );
  }

}
