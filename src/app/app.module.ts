
//#region Module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ChartsModule } from 'ng2-charts';
//#endregion

//#region Components
import { SummaryTableComponent } from './components/summary-table/summary-table.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { CountryComponent } from './pages/country/country.component';
import { CardComponent } from './components/card/card.component';
import { OwTimelineComponent } from './components/ow-timeline/ow-timeline.component';
import { CtryTimelineComponent } from './components/ctry-timeline/ctry-timeline.component';
import { RegrlinChartComponent } from './components/stats-charts/regrlin-chart/regrlin-chart.component';
import { CoeffPearsonChartComponent } from './components/stats-charts/coeff-pearson-chart/coeff-pearson-chart.component';
import { CorrelationChartComponent } from './components/stats-charts/correlation-chart/correlation-chart.component';
import { MediaChartComponent } from './components/stats-charts/media-chart/media-chart.component';
import { PositiveTestChartComponent } from './components/stats-charts/positive-test-chart/positive-test-chart.component';
import { RegrlinCardComponent } from './components/regrlin-card/regrlin-card.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

//#endregion

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    OverviewComponent,
    CountryComponent,
    SummaryTableComponent,
    CardComponent,
    OwTimelineComponent,
    CtryTimelineComponent,
    RegrlinChartComponent,
    CoeffPearsonChartComponent,
    CorrelationChartComponent,
    MediaChartComponent,
    PositiveTestChartComponent,
    RegrlinCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
