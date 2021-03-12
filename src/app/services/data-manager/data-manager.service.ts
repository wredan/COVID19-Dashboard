import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  constructor(private http: HttpClient) {   
  }

  getCovidSummaryTableData() {
    return this.http.get(environment.apiUrl + "datatableData.php");
  }

  getCovidCountryData(countryName: string) {
    return this.http.get(environment.apiUrl + "country.php?name=" + countryName);
  }

  getCountryCodesList() {
    return this.http.get(environment.apiUrl + "countryCodesList.php");
  }
}
