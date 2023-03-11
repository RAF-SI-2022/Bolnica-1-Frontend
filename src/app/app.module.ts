import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
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
// import { WorkspaceAdminComponent } from './components/admin/workspace-admin/workspace-admin.component';
// import { WorkspaceBiochemistComponent } from './components/biochemist/workspace-biochemist/workspace-biochemist.component';
// import { WorkspaceDoctorComponent } from './components/doctor/workspace-doctor/workspace-doctor.component';
// import { WorkspaceNurseComponent } from './components/nurse/workspace-nurse/workspace-nurse.component';
// import { WorkspaceReceptionistComponent } from './components/receptionist/workspace-receptionist/workspace-receptionist.component';
// import { WorkspaceTechnicianComponent } from './components/technician/workspace-technician/workspace-technician.component';
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
// import { NurseWorkspaceComponent } from './nurse-workspace/nurse-workspace.component';
// import { ReceptionistWorkspaceComponent } from './receptionist-workspace/receptionist-workspace.component';
import { TechnicianIssuingResultsComponent } from './components/technician/technician-issuing-results/technician-issuing-results.component';
import { TechnicianScheduleVisitComponent } from './components/technician/technician-schedule-visit/technician-schedule-visit.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetPasswordComponent,
    ProfileComponent,
    // SearchEmployeeComponent,
    // AddEmployeeComponent,
    // EditEmployeeComponent,
    // WorkspaceOnePatientComponent,
    // MedicalChartComponent,
    // IssuingResultsComponent,
    // ScheduleVisitComponent,
    // PatientAdmissionComponent,
    // SearchPatientsDepartmentComponent,
    // ScheduleAdmissionComponent,
    // WorkspaceAdminComponent,
    // WorkspaceBiochemistComponent,
    // WorkspaceDoctorComponent,
    // WorkspaceNurseComponent,
    // WorkspaceReceptionistComponent,
    // WorkspaceTechnicianComponent,
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
    // NurseWorkspaceComponent,
    // ReceptionistWorkspaceComponent,
    TechnicianIssuingResultsComponent,
    TechnicianScheduleVisitComponent,
    TechnicianWorkspaceComponent,
    DoctorMedicalChartComponent,
    DoctorWorkspaceComponent,
    DoctorWorkspaceOnePatientComponent,
    BiochemistWorkspaceComponent,
    AdminAddEmployeeComponent,
    AdminEditEmployeeComponent,
    AdminSearchEmployeeComponent,
    AdminWorkspaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
