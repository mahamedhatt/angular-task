import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerChartComponent } from './customer-chart/customer-chart.component';

const routes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'full' }, // Redirect to customers by default
  { path: 'customers', component: CustomerListComponent },
  { path: 'chart', component: CustomerChartComponent }, // Example route with parameter
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
