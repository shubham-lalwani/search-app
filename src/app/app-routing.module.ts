import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// lazy loading standalone components
const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'users'},
  {path: 'users', loadComponent: ()=> import('./core/users/users.component').then(v => v.UsersComponent)},
  {path: 'payments', loadComponent: ()=> import('./core/payments/payments.component').then(v => v.PaymentsComponent)},
  {path: 'countries', loadComponent: ()=> import('./core/countries/countries.component').then(v => v.CountriesComponent)},
  {path: 'user/:id', loadComponent: ()=> import('./core/list-details/list-details.component').then(v => v.ListDetailsComponent)},
  {path: 'payment/:id', loadComponent: ()=> import('./core/list-details/list-details.component').then(v => v.ListDetailsComponent)},
  {path: 'country/:id', loadComponent: ()=> import('./core/list-details/list-details.component').then(v => v.ListDetailsComponent)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
