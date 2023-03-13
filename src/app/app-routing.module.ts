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
import {
  TechnicianScheduleVisitComponent
} from "./components/technician/technician-schedule-visit/technician-schedule-visit.component";
import { NotFoundComponent } from './components/general/not-found/not-found.component';
import { ResetPasswordLinkComponent } from './components/general/reset-password-link/reset-password-link.component';


const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "reset-password",
    component: ResetPasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "reset-password-link",
    component: ResetPasswordLinkComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin-add-employee",
    component: AdminAddEmployeeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin-edit-employee/:lbz",
    component: AdminEditEmployeeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin-search-employee",
    component: AdminSearchEmployeeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin-workspace",
    component: AdminWorkspaceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "biochemist-workspace",
    component: BiochemistWorkspaceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "doctor-medical-chart",
    component: DoctorMedicalChartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "doctor-search-patients",
    component: DoctorSearchPatientsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "doctor-workspace",
    component: DoctorWorkspaceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "doctor-workspace-one",
    component: DoctorWorkspaceOnePatientComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "nurse-add-patient",
    component: NurseAddPatientComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "nurse-patient-admission",
    component: NursePatientAdmissionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "nurse-schedule-admission",
    component: NurseScheduleAdmissionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "nurse-schedule-appointment",
    component: NurseScheduleAppointmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "nurse-search-patients",
    component: NurseSearchPatientsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "nurse-search-patients-dep",
    component: NurseSearchPatientsDepartmentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "nurse-workspace",
    component: NurseWorkspaceComponent,
    canActivate: [AuthGuard]
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
    canActivate: [AuthGuard]
  },
  {
    path: "technician-patient-admission",
    component: TechnicianPatientAdmissionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "technician-schedule-visit",
    component: TechnicianScheduleVisitComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "technician-workspace",
    component: TechnicianWorkspaceComponent,
    canActivate: [AuthGuard]
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
