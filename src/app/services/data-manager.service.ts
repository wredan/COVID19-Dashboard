import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  dataApiUrl = 'http://localhost/api/';

  constructor(private http: HttpClient) {   
  }

  getCovidSummaryTableData() {
    return this.http.get(this.dataApiUrl + "datatableData.php");
  }

  getCovidCountryData(countryName: string) {
    return this.http.get(this.dataApiUrl + "country.php?name=" + countryName);
  }

  getCountryCodesList() {
    return this.http.get(this.dataApiUrl + "countryCodesList.php");
  }
}
