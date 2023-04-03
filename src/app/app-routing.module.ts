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
import {
  NursePatientAdmissionComponent
} from "./components/nurse/nurse-patient-admission/nurse-patient-admission.component";
import {
  NurseScheduleAdmissionComponent
} from "./components/nurse/nurse-schedule-admission/nurse-schedule-admission.component";
import {
  NurseScheduleAppointmentComponent
} from "./components/nurse/nurse-schedule-appointment/nurse-schedule-appointment.component";
import {NurseSearchPatientsComponent} from "./components/nurse/nurse-search-patients/nurse-search-patients.component";
import {
  NurseSearchPatientsDepartmentsComponent
} from "./components/nurse/nurse-search-patients-departments/nurse-search-patients-departments.component";
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
import {BiochemistSearchComponent} from "./components/biochemist/biochemist-search/biochemist-search.component";
import {
  TechnicianScheduleLabExaminationComponent
} from "./components/technician/technician-schedule-lab-examination/technician-schedule-lab-examination.component";
import {
  TechnicianIssuingResultsDetailsComponent
} from "./components/technician/technician-issuing-results-details/technician-issuing-results-details.component";
import {
  NurseScheduleAppointmentNewComponent
} from "./components/nurse/nurse-schedule-appointment-new/nurse-schedule-appointment-new.component";


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
    component: BiochemistSearchComponent,
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
    path: "doctor-workspace",
    component: DoctorWorkspaceComponent,
    canActivate: [AuthGuard, DoctorGuard]
  },
  {
    path: "doctor-workspace-one/:patient",
    component: DoctorWorkspaceOnePatientComponent,
    canActivate: [AuthGuard, DoctorGuard]
  },
  {
    path: "doctor-create-referral",
    component: DoctorCreateReferralComponent,
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
    path: "nurse-patient-admission",
    component: NursePatientAdmissionComponent,
    canActivate: [AuthGuard, NurseGuard]
  },
  {
    path: "nurse-schedule-admission",
    component: NurseScheduleAdmissionComponent,
    canActivate: [AuthGuard, NurseGuard]
  },
  {
    path: "nurse-schedule-appointment",
    component: NurseScheduleAppointmentComponent,
    canActivate: [AuthGuard, NurseGuard]
  },
  {
    path: "nurse-schedule-appointment-new",
    component: NurseScheduleAppointmentNewComponent,
    canActivate: [AuthGuard, NurseGuard]
  },
  {
    path: "nurse-search-patients",
    component: NurseSearchPatientsComponent,
    canActivate: [AuthGuard, NurseGuard]
  },
  {
    path: "nurse-search-patients-dep",
    component: NurseSearchPatientsDepartmentsComponent,
    canActivate: [AuthGuard, NurseGuard]
  },
  {
    path: "nurse-workspace",
    component: NurseWorkspaceComponent,
    canActivate: [AuthGuard, NurseGuard]
  },
  {
    path: "receptionist-add-patient",
    component: ReceptionistAddPatientComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "receptionist-schedule-appointment",
    component: ReceptionistScheduleAppointmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "receptionist-search-patients",
    component: ReceptionistSearchPatientsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "receptionist-workspace",
    component: ReceptionistWorkspaceComponent,
    canActivate: [AuthGuard]
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
