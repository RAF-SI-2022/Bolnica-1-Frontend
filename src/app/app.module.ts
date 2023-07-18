import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {DropDownListModule} from "@syncfusion/ej2-angular-dropdowns";
import {DateTimePickerModule} from "@syncfusion/ej2-angular-calendars";
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
// import { NursePatientAdmissionComponent } from './components/nurse/nurse-patient-admission/nurse-patient-admission.component';
import { TechnicianPatientAdmissionComponent } from './components/technician/technician-patient-admission/technician-patient-admission.component';
// import { NurseScheduleAdmissionComponent } from './components/nurse/nurse-schedule-admission/nurse-schedule-admission.component';
// import { NurseSearchPatientsDepartmentsComponent } from './components/nurse/nurse-search-patients-departments/nurse-search-patients-departments.component';
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
// import { BiochemistSearchComponent } from './components/biochemist/biochemist-search/biochemist-search.component';
import { TechnicianScheduleLabExaminationComponent } from './components/technician/technician-schedule-lab-examination/technician-schedule-lab-examination.component';
import { TechnicianIssuingResultsDetailsComponent } from './components/technician/technician-issuing-results-details/technician-issuing-results-details.component';
// import { NurseScheduleAppointmentNewComponent } from './components/nurse/nurse-schedule-appointment-new/nurse-schedule-appointment-new.component';
import { BiochemistSearchWorkOrdersComponent } from './components/biochemist/biochemist-search-work-orders/biochemist-search-work-orders.component';
import { BiochemistDetailsAnalysisComponent } from './components/biochemist/biochemist-details-analysis/biochemist-details-analysis.component';
import { BiochemistDailyWorkOrdersComponent } from './components/biochemist/biochemist-daily-work-orders/biochemist-daily-work-orders.component';

// import { DoctorCreateReferralNewComponent } from './components/doctor/doctor-create-referral-new/doctor-create-referral-new.component';
import { NgSelectModule } from '@ng-select/ng-select';

import { DoctorPatientsInfirmaryComponent } from './components/doctor/doctor-patients-infirmary/doctor-patients-infirmary.component';
import { ReceptionistVisitsComponent } from './components/receptionist/receptionist-visits/receptionist-visits.component';
import { ReceptionistRegisterVisitComponent } from './components/receptionist/receptionist-register-visit/receptionist-register-visit.component';
import { DoctorInfirmaryWorkspaceComponent } from './components/doctor/doctor-infirmary-workspace/doctor-infirmary-workspace.component';
import { DoctorInfirmaryStateHistoryComponent } from './components/doctor/doctor-infirmary-state-history/doctor-infirmary-state-history.component';
import { DoctorInfirmaryDischargeListComponent } from './components/doctor/doctor-infirmary-discharge-list/doctor-infirmary-discharge-list.component';
import { DoctorInfirmaryMedicalRecordComponent } from './components/doctor/doctor-infirmary-medical-record/doctor-infirmary-medical-record.component';
import { NurseInfirmaryScheduleAdmissionComponent } from './components/nurse/nurse-infirmary-schedule-admission/nurse-infirmary-schedule-admission.component';
import { NurseInfirmaryScheduledPatientsComponent } from './components/nurse/nurse-infirmary-scheduled-patients/nurse-infirmary-scheduled-patients.component';
import { NurseInfirmaryPatientAdmissionComponent } from './components/nurse/nurse-infirmary-patient-admission/nurse-infirmary-patient-admission.component';
import { NurseInfirmaryWorkspaceComponent } from './components/nurse/nurse-infirmary-workspace/nurse-infirmary-workspace.component';
import { NurseInfirmaryWorkspaceOneComponent } from './components/nurse/nurse-infirmary-workspace-one/nurse-infirmary-workspace-one.component';
import { NurseInfirmaryRegisterStateComponent } from './components/nurse/nurse-infirmary-register-state/nurse-infirmary-register-state.component';
import { DoctorInfirmaryMedicalChartComponent } from './components/doctor/doctor-infirmary-medical-chart/doctor-infirmary-medical-chart.component';
import { DoctorInfirmaryCreateReferralComponent } from './components/doctor/doctor-infirmary-create-referral/doctor-infirmary-create-referral.component';
import { NurseInfirmaryRegisterVisitComponent } from './components/nurse/nurse-infirmary-register-visit/nurse-infirmary-register-visit.component';
import { NurseInfirmaryStateHistoryComponent } from './components/nurse/nurse-infirmary-state-history/nurse-infirmary-state-history.component';
import { NurseInfirmaryVisitsHistoryComponent } from './components/nurse/nurse-infirmary-visits-history/nurse-infirmary-visits-history.component';
import { NurseInfirmarySearchAdmissionComponent } from './components/nurse/nurse-infirmary-search-admission/nurse-infirmary-search-admission.component';
import {
  ReceptionistWorkspaceComponent
} from "./components/receptionist/receptionist-workspace/receptionist-workspace.component";
import { DoctorScheduleExamComponent } from './components/doctor/doctor-schedule-exam/doctor-schedule-exam.component';
import { DoctorCovidCreateReferralComponent } from './components/doctor/covid/doctor-covid-create-referral/doctor-covid-create-referral.component';
import { NurseCovidAmbulanceComponent } from './components/nurse/covid/nurse-covid-ambulance/nurse-covid-ambulance.component';
import { NurseCovidStatisticsComponent } from './components/nurse/covid/nurse-covid-statistics/nurse-covid-statistics.component';
import { DoctorCovidWaitingRoomComponent } from './components/doctor/covid/doctor-covid-waiting-room/doctor-covid-waiting-room.component';
import { DoctorCovidStatisticsComponent } from './components/doctor/covid/doctor-covid-statistics/doctor-covid-statistics.component';
import { DoctorCovidExamComponent } from './components/doctor/covid/doctor-covid-exam/doctor-covid-exam.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NurseVaccineRegularComponent } from './components/nurse/nurse-vaccine-regular/nurse-vaccine-regular.component';
import { NurseVaccineCovidComponent } from './components/nurse/nurse-vaccine-covid/nurse-vaccine-covid.component';
import { NurseCovidCertificateComponent } from './components/nurse/covid/nurse-covid-certificate/nurse-covid-certificate.component';
import { NurseCovidStatsDetailsComponent } from './components/nurse/covid/nurse-covid-stats-details/nurse-covid-stats-details.component';
import { DoctorCovidStatsDetailsComponent } from './components/doctor/covid/doctor-covid-stats-details/doctor-covid-stats-details.component';
import { NurseScheduleVaccinationComponent } from './components/nurse/vaccination/nurse-schedule-vaccination/nurse-schedule-vaccination.component';
import { NurseDailyVaccinationComponent } from './components/nurse/vaccination/nurse-daily-vaccination/nurse-daily-vaccination.component';
import { NurseVaccinationAdmissionComponent } from './components/nurse/vaccination/nurse-vaccination-admission/nurse-vaccination-admission.component';
import { DoctorScheduleShiftsComponent } from './components/doctor/shifts/doctor-schedule-shifts/doctor-schedule-shifts.component';
import { DoctorMyShiftsComponent } from './components/doctor/shifts/doctor-my-shifts/doctor-my-shifts.component';


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
    // NursePatientAdmissionComponent,
    TechnicianPatientAdmissionComponent,
    // NurseScheduleAdmissionComponent,
    // NurseSearchPatientsDepartmentsComponent,
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
    TechnicianScheduleLabExaminationComponent,
    TechnicianIssuingResultsDetailsComponent,
    // NurseScheduleAppointmentNewComponent,
    BiochemistSearchWorkOrdersComponent,
    BiochemistDetailsAnalysisComponent,
    BiochemistDailyWorkOrdersComponent,
    DoctorPatientsInfirmaryComponent,
    ReceptionistVisitsComponent,
    ReceptionistRegisterVisitComponent,
    ReceptionistWorkspaceComponent,
    DoctorInfirmaryWorkspaceComponent,
    DoctorInfirmaryStateHistoryComponent,
    DoctorInfirmaryDischargeListComponent,
    DoctorInfirmaryMedicalRecordComponent,
    NurseInfirmaryScheduleAdmissionComponent,
    NurseInfirmaryScheduledPatientsComponent,
    NurseInfirmaryPatientAdmissionComponent,
    NurseInfirmaryWorkspaceComponent,
    NurseInfirmaryWorkspaceOneComponent,
    NurseInfirmaryRegisterStateComponent,
    DoctorInfirmaryMedicalChartComponent,
    DoctorInfirmaryCreateReferralComponent,
    NurseInfirmaryRegisterVisitComponent,
    NurseInfirmaryStateHistoryComponent,
    NurseInfirmaryVisitsHistoryComponent,
    NurseInfirmarySearchAdmissionComponent,
    DoctorScheduleExamComponent,
    DoctorCovidCreateReferralComponent,
    NurseCovidAmbulanceComponent,
    NurseCovidStatisticsComponent,
    DoctorCovidWaitingRoomComponent,
    DoctorCovidStatisticsComponent,
    DoctorCovidExamComponent,
    NurseVaccineRegularComponent,
    NurseVaccineCovidComponent,
    NurseCovidCertificateComponent,
    NurseCovidStatsDetailsComponent,
    DoctorCovidStatsDetailsComponent,
    NurseScheduleVaccinationComponent,
    NurseDailyVaccinationComponent,
    NurseVaccinationAdmissionComponent,
    DoctorScheduleShiftsComponent,
    DoctorMyShiftsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    NgSelectModule,
    ScheduleModule,RecurrenceEditorModule,DropDownListModule,DateTimePickerModule,
    MatSnackBarModule,
    NgxChartsModule
  ],
  providers: [DayService,WeekService,WorkWeekService,MonthService,MonthAgendaService],
  //providers[],
  bootstrap: [AppComponent]
})
export class AppModule { }
