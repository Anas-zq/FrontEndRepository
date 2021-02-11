import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../Models/Employee';
import { EmployeeServiceService } from '../services/employee-service.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-add-edit-employees',
  templateUrl: './add-edit-employees.component.html',
  styleUrls: ['./add-edit-employees.component.css']
})
export class AddEditEmployeesComponent implements OnInit {

  constructor(
    public fb: FormBuilder,
    public activeModal: NgbActiveModal ,
    private service: EmployeeServiceService,
    public datepipe: DatePipe,
    private modalService: NgbModal
    ){}
  employeeInstance : any; 
  errorMessage : string ="";
  editMode: boolean = false;
  dateObj :Date = new Date();
  empForm: FormGroup = this.fb.group({
    employeeName: ['', Validators.required],
    dateOfBirth: ['', ],
    officialID: ['', Validators.required],
    emailAddress: ['', [Validators.email , Validators.required]]
  });
  CreateForm() {
    this.empForm = this.fb.group({
      employeeName: ['', Validators.required],
      dateOfBirth: ['', ],
      officialID: ['', Validators.required],
      emailAddress: ['', Validators.email]
    });
  }

  resetForm() {
    this.empForm.reset();
  }
  ngOnInit(): void {
    
    if(!this.editMode){
      this.CreateForm();
      this.resetForm();
    }else{
     // this.dateObj = new Date(this.employeeInstance.dateOfBirth);
      let latest_date =this.datepipe.transform(this.employeeInstance.dateOfBirth, 'yyyy-MM-dd');
      this.empForm.patchValue ({
        id: this.employeeInstance.id,
        employeeName : this.employeeInstance.employeeName,
        dateOfBirth :latest_date,
        officialID : this.employeeInstance.officialID,
        creationDate : this.employeeInstance.creationDate,
        emailAddress : this.employeeInstance.emailAddress,
      })
    }

  }

  onSubmit(form : any , content : any) {
  
   if(this.editMode){
    const employee: Employee = <Employee>{
      id: this.employeeInstance.id,
      employeeName : form.employeeName,
      dateOfBirth :form.dateOfBirth,
      officialID : form.officialID,
      creationDate : form.creationDate,
      emailAddress :form.emailAddress,

    }
     this.service.put(employee).subscribe(e => {   this.activeModal.close('Ok click');}
     ,error => {
      this.errorMessage =error;
     if(this.errorMessage.includes("duplicate key") && this.errorMessage.includes("IX_Employees_OfficialID") )
          {
            this.errorMessage = "Official Number is Unique. \n choose another value than "+employee.officialID;
            this.modalService.open(content, { size: 'sm' });
          }
    });
   }else{
    const employee: Employee = <Employee>{
      id: 0,
      employeeName : form.employeeName,
      dateOfBirth :form.dateOfBirth,
      officialID : form.officialID,
      creationDate : form.creationDate,
      emailAddress :form.emailAddress,

    }
    this.service.post(employee).subscribe(e => 
      {   this.activeModal.close('Ok click'); }
      ,error => {
        this.errorMessage =error;
       if(this.errorMessage.includes("duplicate key") && this.errorMessage.includes("IX_Employees_OfficialID") )
            {
              this.errorMessage = "Official Number is Unique. \n choose another value than "+employee.officialID;
              this.modalService.open(content, { size: 'sm' });
            }
      }
      );

   }


  }
}
