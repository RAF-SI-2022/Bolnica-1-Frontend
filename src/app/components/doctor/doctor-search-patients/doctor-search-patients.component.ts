import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Page } from "../../../models/models";
import { Patient } from "../../../models/patient/Patient";
import { Router } from "@angular/router";
import { PatientService } from "../../../services/patient-service/patient.service";
import { interval } from 'rxjs';

@Component({
  selector: 'app-doctor-search-patients',
  templateUrl: './doctor-search-patients.component.html',
  styleUrls: ['./doctor-search-patients.component.css']
})
export class DoctorSearchPatientsComponent implements OnInit {

  // Pagination properties
  id: string = 'custom'
  PAGE_SIZE = 5
  page = 0
  total = 0


  searchForm: FormGroup
  public name: string = ''
  public surname: string = ''
  public jmbg: string = ''
  public lbp: string = ''
  patientPage: Page<Patient> = new Page<Patient>()
  patientList: Patient[] = []
  routerUpper: Router

  constructor(private patientService: PatientService, private formBuilder: FormBuilder, private router: Router) {
    this.routerUpper = router
    this.searchForm = this.formBuilder.group({
      name: '',
      surname: '',
      jmbg: '',
      lbp: ''
    })
  }

  ngOnInit(): void {
    this.patientService.getAllPatients(this.lbp, this.jmbg, this.name, this.surname, this.page, this.PAGE_SIZE)
    .subscribe((response) => {
      this.patientPage = response
      this.patientList = this.patientPage.content
      this.total = this.patientPage.totalElements
    })
    //nterval(5000).subscribe(() => {
      this.updateData();
//    });
  }

  updateData(){
    console.log("FETCHING")
    this.patientService.getAllPatients(this.lbp, this.jmbg, this.name, this.surname, this.page, this.PAGE_SIZE)
    .subscribe((response) => {
      this.patientPage = response
      this.patientList = this.patientPage.content
      this.total = this.patientPage.totalElements

    })
  }

  getPatientList(): void {
    console.log("USOOO")
    if (this.page == 0)
      this.page = 1;

    this.patientService.getAllPatients(this.lbp, this.jmbg, this.name, this.surname, this.page - 1, this.PAGE_SIZE)
      .subscribe((response) => {
        this.patientPage = response
        this.patientList = this.patientPage.content
        this.total = this.patientPage.totalElements

      })
  }

  onTableDataChange(event: any): void {
    this.page = event;
    this.getPatientList();
  }

  onRowClick(lbp: string): void {
    this.router.navigate(['doctor-workspace']);
  }

  sortState = {
    column: '',
    direction: '',
    clicks: 0
  };
  sortOrder: { [key: string]: number } = {};

  sortColumn(column: string): void {
    if (this.sortState.column === column) {
      this.sortState.clicks++;
      if (this.sortState.clicks === 3) {
        this.sortState.direction = '';
        this.sortState.clicks = 0;
      } else {
        this.sortState.direction = this.sortState.direction === 'asc' ? 'desc' : 'asc';
      }
    } else {
      this.sortState.column = column;
      this.sortState.direction = 'asc';
      this.sortState.clicks = 1;
    }
    this.sortOrder[column] = this.sortOrder[column] || 0;
    this.sortOrder[column] = (this.sortOrder[column] + 1) % 3;

    if (this.sortOrder[column] === 0) {

      this.getPatientList();
    } else {
      this.patientList.sort((a: Patient, b: Patient) => {
        const factor = this.sortOrder[column] === 1 ? 1 : -1;
        const aValue = a[column as keyof Patient];
        const bValue = b[column as keyof Patient];

        if (aValue instanceof Date && bValue instanceof Date) {
          return (aValue.getTime() - bValue.getTime()) * factor;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return aValue.localeCompare(bValue) * factor;
        }

        if (aValue < bValue) {
          return -1 * factor;
        }
        if (aValue > bValue) {
          return 1 * factor;
        }
        return 0;
      });
    }
  }



}
