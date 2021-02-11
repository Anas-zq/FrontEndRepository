import { Component } from '@angular/core';
import { Employee } from './Models/Employee';
import { EmployeeServiceService } from './services/employee-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'taskForSteadyPoint';
  constructor(){

  }
  ngOnInit(): void {
    
  }
}
