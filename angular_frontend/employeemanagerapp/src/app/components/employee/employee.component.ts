import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../services/employeeservices/employee.service";
import {Employee} from "./employee";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  public employees: Employee[] | undefined;

  constructor(private employeeService: EmployeeService) {}


  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEmployee(addFrom: NgForm): void {
    document.getElementById('add-employee-form')!.click();
    this.employeeService.addEmployee(addFrom.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onOpenModal(employee: Employee | null, mode: string): void {
    const container = document.getElementById('main-container')!;
    const button = document.createElement('button');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if(mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if(mode === 'edit') {
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if(mode === 'delete') {
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container.appendChild(button);
    button.click();
  }

}
