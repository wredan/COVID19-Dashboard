import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../../services/data-manager/data-manager.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  public country: string = "OWID_WRL";
  public autocompleteForm = new FormControl();
  public filteredOptions: Observable<AutocompleteValue[]>

  public data;
  public showSpinner: boolean = true;
  private networkError: boolean = false;

  constructor(
    private dataManger: DataManagerService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    let country: AutocompleteValue = { name: "World", code: "OWID_WRL" };
    this.getCountryData(country);
    this._getCountryCodesList();
    this.networkError = false;
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
        this.data = res["data"];
        this.country = country.name;
        this.showSpinner = false;
      },
      err => {
        if(!this.networkError) {
          this.snackBar.open("Si è verificato un errore di connessione con il server!" , "Ok", { panelClass: 'error-dialog' });
          this.networkError = true;
        }
      }
    );
  }

  private _getCountryCodesList() {
    this.dataManger.getCountryCodesList().subscribe(
      res => {
        this.options = res["data"];
      },
      err => {
        if(!this.networkError) {
          this.snackBar.open("Si è verificato un errore di connessione con il server!" , "Ok", { panelClass: 'error-dialog' });
          this.networkError = true;
        }
      }
    );
  }
}
