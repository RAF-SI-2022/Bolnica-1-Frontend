import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/general/login/login.component";
import {AuthGuard} from "./guards/auth.guard";
import {ResetPasswordComponent} from "./components/general/reset-password/reset-password.component";
import {AdminAddEmployeeComponent} from "./components/admin/admin-add-employee/admin-add-employee.component";
import {AdminWorkspaceComponent} from "./components/admin/admin-workspace/admin-workspace.component";
import {
  BiochemistWorkspaceComponent
} from "./components/biochemist/biochemist-workspace/biochemist-workspace.component";
import {DoctorWorkspaceComponent} from "./components/doctor/doctor-workspace/doctor-workspace.component";
import {NurseWorkspaceComponent} from "./components/nurse/nurse-workspace/nurse-workspace.component";
import {
  ReceptionistWorkspaceComponent
} from "./components/receptionist/receptionist-workspace/receptionist-workspace.component";
import {
  TechnicianWorkspaceComponent
} from "./components/technician/technician-workspace/technician-workspace.component";
import {AdminSearchEmployeeComponent} from "./components/admin/admin-search-employee/admin-search-employee.component";
import {ProfileComponent} from "./components/general/profile/profile.component";
import {AdminEditEmployeeComponent} from "./components/admin/admin-edit-employee/admin-edit-employee.component";
import {DoctorMedicalChartComponent} from "./components/doctor/doctor-medical-chart/doctor-medical-chart.component";
import {
  DoctorSearchPatientsComponent
} from "./components/doctor/doctor-search-patients/doctor-search-patients.component";
import {
  DoctorWorkspaceOnePatientComponent
} from "./components/doctor/doctor-workspace-one-patient/doctor-workspace-one-patient.component";
import {NurseAddPatientComponent} from "./components/nurse/nurse-add-patient/nurse-add-patient.component";
// import {
//   NursePatientAdmissionComponent
// } from "./components/nurse/nurse-patient-admission/nurse-patient-admission.component";
// import {
//   NurseScheduleAdmissionComponent
// } from "./components/nurse/nurse-schedule-admission/nurse-schedule-admission.component";
import {
  NurseScheduleAppointmentComponent
} from "./components/nurse/nurse-schedule-appointment/nurse-schedule-appointment.component";
import {NurseSearchPatientsComponent} from "./components/nurse/nurse-search-patients/nurse-search-patients.component";
// import {
//   NurseSearchPatientsDepartmentsComponent
// } from "./components/nurse/nurse-search-patients-departments/nurse-search-patients-departments.component";
import {
  ReceptionistAddPatientComponent
} from "./components/receptionist/receptionist-add-patient/receptionist-add-patient.component";
import {
  ReceptionistScheduleAppointmentComponent
} from "./components/receptionist/receptionist-schedule-appointment/receptionist-schedule-appointment.component";
import {
  ReceptionistSearchPatientsComponent
} from "./components/receptionist/receptionist-search-patients/receptionist-search-patients.component";
import {
  TechnicianIssuingResultsComponent
} from "./components/technician/technician-issuing-results/technician-issuing-results.component";
import {
  TechnicianPatientAdmissionComponent
} from "./components/technician/technician-patient-admission/technician-patient-admission.component";
import { NotFoundComponent } from './components/general/not-found/not-found.component';
import { ResetPasswordLinkComponent } from './components/general/reset-password-link/reset-password-link.component';
import { LoggedOutGuard } from './guards/logged-out.guard';
import { NewPasswordComponent } from './components/general/new-password/new-password.component';
import {NurseEditPatientComponent} from "./components/nurse/nurse-edit-patient/nurse-edit-patient.component";
import {
  DoctorCreateReferralComponent
} from "./components/doctor/doctor-create-referral/doctor-create-referral.component";
import {AdminGuard} from "./guards/role/admin.guard";
import {BiochemistGuard} from "./guards/role/general/biochemist.guard";
import {DoctorGuard} from "./guards/role/general/doctor.guard";
import {NurseGuard} from "./guards/role/general/nurse.guard";
import {TechnicianGuard} from "./guards/role/general/technician.guard";
// import {BiochemistSearchComponent} from "./components/biochemist/biochemist-search/biochemist-search.component";
import {
  TechnicianScheduleLabExaminationComponent
} from "./components/technician/technician-schedule-lab-examination/technician-schedule-lab-examination.component";
import {
  TechnicianIssuingResultsDetailsComponent
} from "./components/technician/technician-issuing-results-details/technician-issuing-results-details.component";

import {
  BiochemistSearchWorkOrdersComponent
} from "./components/biochemist/biochemist-search-work-orders/biochemist-search-work-orders.component";
import {
  BiochemistDailyWorkOrdersComponent
} from "./components/biochemist/biochemist-daily-work-orders/biochemist-daily-work-orders.component";
import {
  BiochemistDetailsAnalysisComponent
} from "./components/biochemist/biochemist-details-analysis/biochemist-details-analysis.component";
import {
  DoctorInfirmaryDischargeListComponent
} from "./components/doctor/doctor-infirmary-discharge-list/doctor-infirmary-discharge-list.component";
import {
  DoctorInfirmaryMedicalChartComponent
} from "./components/doctor/doctor-infirmary-medical-chart/doctor-infirmary-medical-chart.component";
import {
  DoctorInfirmaryMedicalRecordComponent
} from "./components/doctor/doctor-infirmary-medical-record/doctor-infirmary-medical-record.component";
import {
  DoctorInfirmaryStateHistoryComponent
} from "./components/doctor/doctor-infirmary-state-history/doctor-infirmary-state-history.component";
import {
  DoctorInfirmaryWorkspaceComponent
} from "./components/doctor/doctor-infirmary-workspace/doctor-infirmary-workspace.component";
import {
  NurseInfirmaryPatientAdmissionComponent
} from "./components/nurse/nurse-infirmary-patient-admission/nurse-infirmary-patient-admission.component";
import {
  NurseInfirmaryRegisterStateComponent
} from "./components/nurse/nurse-infirmary-register-state/nurse-infirmary-register-state.component";
import {
  NurseInfirmaryScheduleAdmissionComponent
} from "./components/nurse/nurse-infirmary-schedule-admission/nurse-infirmary-schedule-admission.component";
import {
  NurseInfirmaryScheduledPatientsComponent
} from "./components/nurse/nurse-infirmary-scheduled-patients/nurse-infirmary-scheduled-patients.component";
import {
  NurseInfirmaryWorkspaceComponent
} from "./components/nurse/nurse-infirmary-workspace/nurse-infirmary-workspace.component";
import {
  NurseInfirmaryWorkspaceOneComponent
} from "./components/nurse/nurse-infirmary-workspace-one/nurse-infirmary-workspace-one.component";
import {ReceptionistVisitsComponent} from "./components/receptionist/receptionist-visits/receptionist-visits.component";
import {
  ReceptionistRegisterVisitComponent
} from "./components/receptionist/receptionist-register-visit/receptionist-register-visit.component";
import {
  DoctorPatientsInfirmaryComponent
} from "./components/doctor/doctor-patients-infirmary/doctor-patients-infirmary.component";
import {
  DoctorInfirmaryCreateReferralComponent
} from "./components/doctor/doctor-infirmary-create-referral/doctor-infirmary-create-referral.component";
import {
  NurseInfirmaryStateHistoryComponent
} from "./components/nurse/nurse-infirmary-state-history/nurse-infirmary-state-history.component";
import {
  NurseInfirmaryVisitsHistoryComponent
} from "./components/nurse/nurse-infirmary-visits-history/nurse-infirmary-visits-history.component";
import {
  NurseInfirmaryRegisterVisitComponent
} from "./components/nurse/nurse-infirmary-register-visit/nurse-infirmary-register-visit.component";
import {
  NurseInfirmarySearchAdmissionComponent
} from "./components/nurse/nurse-infirmary-search-admission/nurse-infirmary-search-admission.component";
import {ReceptionistGuard} from "./guards/role/general/receptionist.guard";
import {DoctorScheduleExamComponent} from "./components/doctor/doctor-schedule-exam/doctor-schedule-exam.component";
import {
  NurseCovidAmbulanceComponent
} from "./components/nurse/covid/nurse-covid-ambulance/nurse-covid-ambulance.component";
import {
  NurseCovidStatisticsComponent
} from "./components/nurse/covid/nurse-covid-statistics/nurse-covid-statistics.component";
import {
  DoctorCovidWaitingRoomComponent
} from "./components/doctor/covid/doctor-covid-waiting-room/doctor-covid-waiting-room.component";
import {DoctorCovidExamComponent} from "./components/doctor/covid/doctor-covid-exam/doctor-covid-exam.component";
import {
  DoctorCovidStatisticsComponent
} from "./components/doctor/covid/doctor-covid-statistics/doctor-covid-statistics.component";
import {
  DoctorCovidCreateReferralComponent
} from "./components/doctor/covid/doctor-covid-create-referral/doctor-covid-create-referral.component";
import {
  NurseCovidCertificateComponent
} from "./components/nurse/covid/nurse-covid-certificate/nurse-covid-certificate.component";
import {
  NurseCovidStatsDetailsComponent
} from "./components/nurse/covid/nurse-covid-stats-details/nurse-covid-stats-details.component";
import {
  DoctorCovidStatsDetailsComponent
} from "./components/doctor/covid/doctor-covid-stats-details/doctor-covid-stats-details.component";
import {
  NurseVaccinationAdmissionComponent
} from "./components/nurse/vaccination/nurse-vaccination-admission/nurse-vaccination-admission.component";
import {
  NurseDailyVaccinationComponent
} from "./components/nurse/vaccination/nurse-daily-vaccination/nurse-daily-vaccination.component";
import {
  NurseScheduleVaccinationComponent
} from "./components/nurse/vaccination/nurse-schedule-vaccination/nurse-schedule-vaccination.component";
import {
  DoctorScheduleShiftsComponent
} from "./components/doctor/shifts/doctor-schedule-shifts/doctor-schedule-shifts.component";
import {DoctorMyShiftsComponent} from "./components/doctor/shifts/doctor-my-shifts/doctor-my-shifts.component";
import {NurseMyShiftComponent} from "./components/nurse/nurse-my-shift/nurse-my-shift.component";
import {BiochemistMyShiftsComponent} from "./components/biochemist/biochemist-my-shifts/biochemist-my-shifts.component";
import {TechnicianMyShiftsComponent} from "./components/technician/technician-my-shifts/technician-my-shifts.component";
import {AdminMyShiftsComponent} from "./components/admin/admin-my-shifts/admin-my-shifts.component";
import {CovidGuard} from "./guards/covid.guard";


const routes: Routes = [
  {
    path: "",
    component: AdminWorkspaceComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [LoggedOutGuard]
  },
  {
    path: "reset-password",
    component: ResetPasswordComponent,
    canActivate: [LoggedOutGuard]
  },
  {
    path: "new-password",
    component: NewPasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "reset-password-link",
    component: ResetPasswordLinkComponent,
    canActivate: [LoggedOutGuard]
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin-add-employee",
    component: AdminAddEmployeeComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: "admin-edit-employee/:lbz",
    component: AdminEditEmployeeComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: "admin-search-employee",
    component: AdminSearchEmployeeComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: "admin-my-shifts",
    component: AdminMyShiftsComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: "admin-workspace",
    component: AdminWorkspaceComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: "biochemist-workspace",
    component: BiochemistWorkspaceComponent,
    canActivate: [AuthGuard, BiochemistGuard]
  },
  {
    path: "biochemist-search",
    component: BiochemistSearchWorkOrdersComponent,
    canActivate: [AuthGuard, BiochemistGuard]
  },
  {
    path: "biochemist-daily",
    component: BiochemistDailyWorkOrdersComponent,
    canActivate: [AuthGuard, BiochemistGuard]
  },
  {
    path: "biochemist-my-shifts",
    component: BiochemistMyShiftsComponent,
    canActivate: [AuthGuard, BiochemistGuard]
  },
  {
    path: "biochemist-details/:id",
    component: BiochemistDetailsAnalysisComponent,
    canActivate: [AuthGuard, BiochemistGuard]
  },
  {
    path: "doctor-medical-chart/:lbp",
    component: DoctorMedicalChartComponent,
    canActivate: [AuthGuard, DoctorGuard]
  },
  {
    path: "doctor-search-patients",
    component: DoctorSearchPatientsComponent,
    canActivate: [AuthGuard, DoctorGuard]
  },
  {
    path: "doctor-schedule-shifts",
    component: DoctorScheduleShiftsComponent,
    canActivate: [AuthGuard, DoctorGuard]
  },
  {
    path: "doctor-my-shifts",
    component: DoctorMyShiftsComponent,
    canActivate: [AuthGuard, DoctorGuard]
  },
  {
    path: "doctor-workspace",
    component: DoctorWorkspaceComponent,
    canActivate: [AuthGuard, DoctorGuard]
  },
  {
    path: "doctor-workspace-one/:lbp",
    component: DoctorWorkspaceOnePatientComponent,
    canActivate: [AuthGuard, DoctorGuard]
  },
  {
    path: "doctor-create-referral/:lbp",
    component: DoctorCreateReferralComponent,
    canActivate: [AuthGuard, DoctorGuard]
  },
  {
    path: "doctor-patients-infirmary",
    component: DoctorPatientsInfirmaryComponent,
    canActivate: [AuthGuard, DoctorGuard]
  },
  {
    path: "doctor-infirmary-discharge-list/:lbp",
    component: DoctorInfirmaryDischargeListComponent,
    canActivate: [AuthGuard, DoctorGuard]
  },
  {
    path: "doctor-schedule-exam/:lbp",
    component: DoctorScheduleExamComponent,
    canActivate: [AuthGuard, DoctorGuard]
  },
  {
    path: "doctor-infirmary-medical-chart/:lbp",
    component: DoctorInfirmaryMedicalChartComponent,
    canActivate: [AuthGuard, DoctorGuard]
  },
  {
    path: "doctor-infirmary-medical-record/:lbp",
    component: DoctorInfirmaryMedicalRecordComponent,
    canActivate: [AuthGuard, DoctorGuard]
  },
  {
    path: "doctor-infirmary-state-history/:lbp",
    component: DoctorInfirmaryStateHistoryComponent,
    canActivate: [AuthGuard, DoctorGuard]
  },
  {
    path: "doctor-infirmary-workspace/:lbp",
    component: DoctorInfirmaryWorkspaceComponent,
    canActivate: [AuthGuard, DoctorGuard]
  },
  {
    path: "doctor-infirmary-create-referral/:lbp",
    component: DoctorInfirmaryCreateReferralComponent,
    canActivate: [AuthGuard, DoctorGuard]
  },
  {
    path: "doctor-covid-waiting-room",
    component: DoctorCovidWaitingRoomComponent,
    canActivate: [AuthGuard, DoctorGuard, CovidGuard]
  },
  {
    path: "doctor-covid-exam/:lbp",
    component: DoctorCovidExamComponent,
    canActivate: [AuthGuard, DoctorGuard, CovidGuard]
  },
  {
    path: "doctor-covid-statistics",
    component: DoctorCovidStatisticsComponent,
    canActivate: [AuthGuard, DoctorGuard, CovidGuard]
  },
  {
    path: "doctor-covid-stats-details",
    component: DoctorCovidStatsDetailsComponent,
    canActivate: [AuthGuard, DoctorGuard, CovidGuard]
  },
  {
    path: "doctor-covid-create-referral/:lbp",
    component: DoctorCovidCreateReferralComponent,
    canActivate: [AuthGuard, DoctorGuard]
  },
  {
    path: "nurse-add-patient",
    component: NurseAddPatientComponent,
    canActivate: [AuthGuard, NurseGuard]
  },
  {
    path: "nurse-edit-patient/:lbp",
    component: NurseEditPatientComponent,
    canActivate: [AuthGuard, NurseGuard]
  },
  {
    path: "nurse-my-shifts",
    component: NurseMyShiftComponent,
    canActivate: [AuthGuard, NurseGuard]
  },

  {
    path: "nurse-schedule-appointment",
    component: NurseScheduleAppointmentComponent,
    canActivate: [AuthGuard, NurseGuard]
  },
  {
    path: "nurse-search-patients",
    component: NurseSearchPatientsComponent,
    canActivate: [AuthGuard, NurseGuard]
  },

  {
    path: "nurse-workspace",
    component: NurseWorkspaceComponent,
    canActivate: [AuthGuard, NurseGuard]
  },
  {
    path: "nurse-infirmary-patient-admission",
    component: NurseInfirmaryPatientAdmissionComponent,
    canActivate: [AuthGuard, NurseGuard]
  },

  {
    path: "nurse-infirmary-schedule-admission",
    component: NurseInfirmaryScheduleAdmissionComponent,
    canActivate: [AuthGuard, NurseGuard]
  },
  {
    path: "nurse-infirmary-search-admission",
    component: NurseInfirmarySearchAdmissionComponent,
    canActivate: [AuthGuard, NurseGuard]
  },
  {
    path: "nurse-infirmary-scheduled-patients",
    component: NurseInfirmaryScheduledPatientsComponent,
    canActivate: [AuthGuard, NurseGuard]
  },
  {
    path: "nurse-infirmary-workspace",
    component: NurseInfirmaryWorkspaceComponent,
    canActivate: [AuthGuard, NurseGuard]
  },
  {
    path: "nurse-infirmary-workspace-one/:lbp",
    component: NurseInfirmaryWorkspaceOneComponent,
    canActivate: [AuthGuard, NurseGuard]
  },
  {
    path: "nurse-vaccination-admission/:lbp",
    component: NurseVaccinationAdmissionComponent,
    canActivate: [AuthGuard, NurseGuard]
  },
  {
    path: "nurse-daily-vaccination",
    component: NurseDailyVaccinationComponent,
    canActivate: [AuthGuard, NurseGuard]
  },
  {
    path: "nurse-schedule-vaccination",
    component: NurseScheduleVaccinationComponent,
    canActivate: [AuthGuard, NurseGuard]
  },

  {
    path: "nurse-infirmary-state-history/:lbp",
    component: NurseInfirmaryStateHistoryComponent,
    canActivate: [AuthGuard, NurseGuard]
  },
  {
    path: "nurse-infirmary-register-state/:lbp",
    component: NurseInfirmaryRegisterStateComponent,
    canActivate: [AuthGuard, NurseGuard]
  },
  {
    path: "nurse-infirmary-visits-history/:lbp",
    component: NurseInfirmaryVisitsHistoryComponent,
    canActivate: [AuthGuard, NurseGuard]
  },
  {
    path: "nurse-infirmary-register-visit/:lbp",
    component: NurseInfirmaryRegisterVisitComponent,
    canActivate: [AuthGuard, NurseGuard]
  },
  {
    path: "nurse-covid-ambulance",
    component: NurseCovidAmbulanceComponent,
    canActivate: [AuthGuard, NurseGuard]
  },

  {
    path: "nurse-covid-statistics",
    component: NurseCovidStatisticsComponent,
    canActivate: [AuthGuard, NurseGuard, CovidGuard]
  },
  {
    path: "nurse-covid-stats-details",
    component: NurseCovidStatsDetailsComponent,
    canActivate: [AuthGuard, NurseGuard, CovidGuard]
  },
  {
    path: "nurse-covid-certificate",
    component: NurseCovidCertificateComponent,
    canActivate: [AuthGuard, NurseGuard, CovidGuard]
  },

  {
    path: "receptionist-add-patient",
    component: ReceptionistAddPatientComponent,
    canActivate: [AuthGuard, ReceptionistGuard]
  },
  {
    path: "receptionist-schedule-appointment",
    component: ReceptionistScheduleAppointmentComponent,
    canActivate: [AuthGuard, ReceptionistGuard]
  },
  {
    path: "receptionist-search-patients",
    component: ReceptionistSearchPatientsComponent,
    canActivate: [AuthGuard, ReceptionistGuard]
  },
  {
    path: "receptionist-workspace",
    component: ReceptionistWorkspaceComponent,
    canActivate: [AuthGuard, ReceptionistGuard]
  },
  {
    path: "receptionist-visits",
    component: ReceptionistVisitsComponent,
    canActivate: [AuthGuard, ReceptionistGuard]
  },
  {
    path: "receptionist-register-visit",
    component: ReceptionistRegisterVisitComponent,
    canActivate: [AuthGuard, ReceptionistGuard]
  },
  {
    path: "technician-issuing-results",
    component: TechnicianIssuingResultsComponent,
    canActivate: [AuthGuard, TechnicianGuard]
  },
  {
    path: "technician-issuing-results-details/:id",
    component: TechnicianIssuingResultsDetailsComponent,
    canActivate: [AuthGuard, TechnicianGuard]
  },
  {
    path: "technician-patient-admission",
    component: TechnicianPatientAdmissionComponent,
    canActivate: [AuthGuard, TechnicianGuard]
  },
  {
    path: "technician-schedule-lab-examination",
    component: TechnicianScheduleLabExaminationComponent,
    canActivate: [AuthGuard, TechnicianGuard]
  },
  {
    path: "technician-workspace",
    component: TechnicianWorkspaceComponent,
    canActivate: [AuthGuard, TechnicianGuard]
  },
  {
    path: "technician-my-shifts",
    component: TechnicianMyShiftsComponent,
    canActivate: [AuthGuard, TechnicianGuard]
  },
  {
    path: "**",
    component: NotFoundComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
