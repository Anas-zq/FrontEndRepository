import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewEmployeesComponent } from './view-employees/view-employees.component';
import { AddEditEmployeesComponent } from './add-edit-employees/add-edit-employees.component';
import { EmployeeServiceService } from './services/employee-service.service';
import { HttpClientModule } from '@angular/common/http';
import {NgbPaginationModule, NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ViewEmployeesComponent,
    AddEditEmployeesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbPaginationModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    
   
    
    
  ],
  providers: [EmployeeServiceService,HttpClientModule,DatePipe],
  bootstrap: [AppComponent],
  exports: [ViewEmployeesComponent],
  entryComponents: [AddEditEmployeesComponent]
})
export class AppModule { }
