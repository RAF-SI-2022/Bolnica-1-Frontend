import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';

import {ScheduleModule,RecurrenceEditorModule, DayService,WeekService,WorkWeekService,MonthService,MonthAgendaService} from '@syncfusion/ej2-angular-schedule';

import { LoginComponent } from './components/general/login/login.component';
import { ResetPasswordComponent } from './components/general/reset-password/reset-password.component';
import { ProfileComponent } from './components/general/profile/profile.component';
// import { SearchEmployeeComponent } from './components/admin/search-employee/search-employee.component';
// import { AddEmployeeComponent } from './components/admin/add-employee/add-employee.component';
// import { EditEmployeeComponent } from './components/admin/edit-employee/edit-employee.component';
// import { WorkspaceOnePatientComponent } from './components/doctor/workspace-one-patient/workspace-one-patient.component';
// import { MedicalChartComponent } from './components/doctor/medical-chart/medical-chart.component';
// import { IssuingResultsComponent } from './components/technician/issuing-results/issuing-results.component';
// import { ScheduleVisitComponent } from './components/technician/schedule-visit/schedule-visit.component';
// import { PatientAdmissionComponent } from './components/technician/patient-admission/patient-admission.component';
// import { SearchPatientsDepartmentComponent } from './components/nurse/search-patients-department/search-patients-department.component';
// import { ScheduleAdmissionComponent } from './components/nurse/schedule-admission/schedule-admission.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { DoctorSearchPatientsComponent } from './components/doctor/doctor-search-patients/doctor-search-patients.component';
import { NurseSearchPatientsComponent } from './components/nurse/nurse-search-patients/nurse-search-patients.component';
import { ReceptionistSearchPatientsComponent } from './components/receptionist/receptionist-search-patients/receptionist-search-patients.component';
import { NurseAddPatientComponent } from './components/nurse/nurse-add-patient/nurse-add-patient.component';
import { ReceptionistAddPatientComponent } from './components/receptionist/receptionist-add-patient/receptionist-add-patient.component';
import { NurseScheduleAppointmentComponent } from './components/nurse/nurse-schedule-appointment/nurse-schedule-appointment.component';
import { ReceptionistScheduleAppointmentComponent } from './components/receptionist/receptionist-schedule-appointment/receptionist-schedule-appointment.component';
import { NursePatientAdmissionComponent } from './components/nurse/nurse-patient-admission/nurse-patient-admission.component';
import { TechnicianPatientAdmissionComponent } from './components/technician/technician-patient-admission/technician-patient-admission.component';
import { NurseScheduleAdmissionComponent } from './components/nurse/nurse-schedule-admission/nurse-schedule-admission.component';
import { NurseSearchPatientsDepartmentsComponent } from './components/nurse/nurse-search-patients-departments/nurse-search-patients-departments.component';
import { TechnicianIssuingResultsComponent } from './components/technician/technician-issuing-results/technician-issuing-results.component';
//import { TechnicianScheduleVisitComponent } from './components/technician/technician-schedule-visit/technician-schedule-visit.component';
import { TechnicianWorkspaceComponent } from './components/technician/technician-workspace/technician-workspace.component';
import { DoctorMedicalChartComponent } from './components/doctor/doctor-medical-chart/doctor-medical-chart.component';
import { DoctorWorkspaceComponent } from './components/doctor/doctor-workspace/doctor-workspace.component';
import { DoctorWorkspaceOnePatientComponent } from './components/doctor/doctor-workspace-one-patient/doctor-workspace-one-patient.component';
import { BiochemistWorkspaceComponent } from './components/biochemist/biochemist-workspace/biochemist-workspace.component';
import { AdminAddEmployeeComponent } from './components/admin/admin-add-employee/admin-add-employee.component';
import { AdminEditEmployeeComponent } from './components/admin/admin-edit-employee/admin-edit-employee.component';
import { AdminSearchEmployeeComponent } from './components/admin/admin-search-employee/admin-search-employee.component';
import { AdminWorkspaceComponent } from './components/admin/admin-workspace/admin-workspace.component';
import {NgxPaginationModule} from "ngx-pagination";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './components/general/not-found/not-found.component';
import { ResetPasswordLinkComponent } from './components/general/reset-password-link/reset-password-link.component';
import { NewPasswordComponent } from './components/general/new-password/new-password.component';
import { NurseEditPatientComponent } from './components/nurse/nurse-edit-patient/nurse-edit-patient.component';
import { DoctorCreateReferralComponent } from './components/doctor/doctor-create-referral/doctor-create-referral.component';
import {NurseWorkspaceComponent} from "./components/nurse/nurse-workspace/nurse-workspace.component";
import { BiochemistSearchComponent } from './components/biochemist/biochemist-search/biochemist-search.component';
import { TechnicianScheduleLabExaminationComponent } from './components/technician/technician-schedule-lab-examination/technician-schedule-lab-examination.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetPasswordComponent,
    ProfileComponent,
    DoctorSearchPatientsComponent,
    NurseSearchPatientsComponent,
    ReceptionistSearchPatientsComponent,
    NurseAddPatientComponent,
    ReceptionistAddPatientComponent,
    NurseScheduleAppointmentComponent,
    ReceptionistScheduleAppointmentComponent,
    NursePatientAdmissionComponent,
    TechnicianPatientAdmissionComponent,
    NurseScheduleAdmissionComponent,
    NurseSearchPatientsDepartmentsComponent,
    NurseWorkspaceComponent,
    TechnicianIssuingResultsComponent,
    TechnicianWorkspaceComponent,
    DoctorMedicalChartComponent,
    DoctorWorkspaceComponent,
    DoctorWorkspaceOnePatientComponent,
    BiochemistWorkspaceComponent,
    AdminAddEmployeeComponent,
    AdminEditEmployeeComponent,
    AdminSearchEmployeeComponent,
    AdminWorkspaceComponent,
    NotFoundComponent,
    ResetPasswordLinkComponent,
    NewPasswordComponent,
    NurseEditPatientComponent,
    DoctorCreateReferralComponent,
    BiochemistSearchComponent,
    TechnicianScheduleLabExaminationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,

    ScheduleModule,RecurrenceEditorModule
  ],
  providers: [DayService,WeekService,WorkWeekService,MonthService,MonthAgendaService],
  //providers[],
  bootstrap: [AppComponent]
})
export class AppModule { }
