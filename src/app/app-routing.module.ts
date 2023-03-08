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
    path: "admin-add-employee",
    component: AdminAddEmployeeComponent,
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
    path: "doctor-workspace",
    component: DoctorWorkspaceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "nurse-workspace",
    component: NurseWorkspaceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "receptionist-workspace",
    component: ReceptionistWorkspaceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "technician-workspace",
    component: TechnicianWorkspaceComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
