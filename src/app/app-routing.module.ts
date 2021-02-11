import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewEmployeesComponent } from './view-employees/view-employees.component';

const routes: Routes = [

  {path:'viewEmployee',component:ViewEmployeesComponent},
  {path:'',component:ViewEmployeesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
