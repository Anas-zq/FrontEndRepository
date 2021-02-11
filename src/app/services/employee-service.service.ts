import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../Models/Employee';
import { ApiService } from './api-service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  Api = '/Employee/';
  constructor(public apiService:ApiService,
   ) { }

  getAll(): Observable<Employee[]> {
    return this.apiService.get<Employee>(this.Api + "GetAllEmployee");
}
getById(): Observable<Employee[]> {
  return this.apiService.get<Employee>(this.Api+"GetEmployeeById/");
}
  post(input : Employee) :Observable<Employee> {
    return this.apiService.post(this.Api+"AddEmployee",input);
}
put(input : Employee) :Observable<Employee> {
  return this.apiService.put(this.Api+"UpdateEmployee",input);
}
delete(id : number) :Observable<Boolean> {
  return this.apiService.delete(this.Api+"DeleteEmployeeById/"+id);
}
}
