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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { OverviewComponent } from './overview/overview.component';
import { CountryComponent } from './country/country.component';

import { HttpClientModule } from '@angular/common/http';
import { SummaryTableComponent } from './summary-table/summary-table.component';
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
import { CardComponent } from './widgets/card/card.component';
import { OwTimelineComponent } from './widgets/ow-timeline/ow-timeline.component';
import { CtryTimelineComponent } from './widgets/ctry-timeline/ctry-timeline.component';
import { RegrlinChartComponent } from './widgets/stats-charts/regrlin-chart/regrlin-chart.component';
import { CoeffPearsonChartComponent } from './widgets/stats-charts/coeff-pearson-chart/coeff-pearson-chart.component';
import { CorrelationChartComponent } from './widgets/stats-charts/correlation-chart/correlation-chart.component';
import { MediaChartComponent } from './widgets/stats-charts/media-chart/media-chart.component';
import { PositiveTestChartComponent } from './widgets/stats-charts/positive-test-chart/positive-test-chart.component';
import { RegrlinCardComponent } from './widgets/regrlin-card/regrlin-card.component';
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
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
