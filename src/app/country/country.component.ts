import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../services/data-manager.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

interface AutocompleteValue {
  name: string;
  code: string;
}

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  public options: AutocompleteValue[] = [];
  public country: string;
  public autocompleteForm = new FormControl();
  public filteredOptions: Observable<AutocompleteValue[]>

  public data;
  public showSpinner: boolean = true;

  constructor(private dataManger: DataManagerService) { }

  ngOnInit(): void {
    let country: AutocompleteValue = { name: "World", code: "OWID_WRL" };
    this.getCountryData(country);
    this._getCountryCodesList();

    this.filteredOptions = this.autocompleteForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): AutocompleteValue[] {
    const filterValue = typeof value == "string" ? value.toLowerCase() : '';
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayFn(subject) {
    return subject ? subject.name : undefined;
  }

  getCountryData(country: AutocompleteValue) {
    this.showSpinner = true;
    this.dataManger.getCovidCountryData(country.code).subscribe(
      res => {
        this.data = res.data;
        this.country = (country.name == "World") ? "Situazione Mondiale" : country.name;
        this.showSpinner = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  private _getCountryCodesList() {
    this.dataManger.getCountryCodesList().subscribe(
      res => {
        this.options = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
