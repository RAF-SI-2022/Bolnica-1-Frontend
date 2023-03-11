import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './components/general/login/login.component';
import { ResetPasswordComponent } from './components/general/reset-password/reset-password.component';
import { ProfileComponent } from './components/general/profile/profile.component';
import {FormsModule} from "@angular/forms";
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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
