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

  options: AutocompleteValue[] = [];

  autocompleteForm = new FormControl();
  filteredOptions: Observable<AutocompleteValue[]>

  public data;
  public showSpinner: boolean = true;

  constructor(private dataManger: DataManagerService) { }

  ngOnInit(): void {
    this._getCountryData("ITA");
    this._getCountryCodesList();

    this.filteredOptions = this.autocompleteForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): AutocompleteValue[] {  
    console.log(typeof value);
    const filterValue = typeof value == "string" ? value.toLowerCase() : '';   
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayFn(subject) {
    return subject ? subject.name : undefined;
  }

  private _getCountryData(countryCode: string) {
    this.dataManger.getCovidCountryData(countryCode).subscribe(
      res => {
        console.log(res.data);
        this.data = res.data;
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
        console.log(this.options);
      },
      err => {
        console.log(err);
      }
    );
  }
}
