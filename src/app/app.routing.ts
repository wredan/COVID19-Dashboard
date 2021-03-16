import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverviewComponent } from './pages/overview/overview.component';
import { CountryComponent } from './pages/country/country.component';

const routes: Routes = [
  { path: 'overview', component: OverviewComponent },
  { path: 'country', component: CountryComponent },
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: '**', redirectTo: 'overview'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
