import { Component, OnInit, Type } from '@angular/core';
import { Employee } from '../Models/Employee';
import { EmployeeServiceService } from '../services/employee-service.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditEmployeesComponent } from '../add-edit-employees/add-edit-employees.component';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent implements OnInit {

  constructor(private service: EmployeeServiceService , private modalService: NgbModal) { }
  collectionSize: number = 0;
  page = 1;
  pageSize = 4;
  employees: Employee[] = [];
  deletedEmploye : any;
  ngOnInit(): void {
    this.service.getAll().subscribe(e => {
      this.employees = e;
      this.collectionSize = e.length;
    })
  }
  refreshEmployees() {
    this.service.getAll().subscribe(e => {
      this.employees = e;
      this.collectionSize = e.length;

      this.employees = this.employees
        .map((em, i) => ({ id1: i + 1, ...em }))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    })
  }

  addEmployee(){
    const modalRef = this.modalService.open(AddEditEmployeesComponent,{ size: 'lg' });
    modalRef.componentInstance.editMode = false;
    modalRef.result.finally(() => {this.refreshEmployees();});
  }
  editEmployee(emp : Employee){
    const modalRef = this.modalService.open(AddEditEmployeesComponent,{ size: 'lg' });
    modalRef.componentInstance.employeeInstance = emp;
    modalRef.componentInstance.editMode = true;
    modalRef.result.finally(() => {this.refreshEmployees();});
  }
  openConfirmMessage(emp : Employee,content:any){
    this.deletedEmploye = emp;
    this.modalService.open(content);
  }
  deleteEmployee(){
    this.service.delete(this.deletedEmploye.id).subscribe(e=>{
      this.refreshEmployees();
      this.modalService.dismissAll();
    });
  }
}
