import {Component, OnInit} from '@angular/core';
import {Zaposleni} from "../../../models/models";
import {UserService} from "../../../services/user-service/user.service";

@Component({
  selector: 'app-admin-add-employee',
  templateUrl: './admin-add-employee.component.html',
  styleUrls: ['./admin-add-employee.component.css']
})
export class AdminAddEmployeeComponent implements OnInit {

  ime: string = '';
  prezime: string = '';
  datumRodjenja: string = '';
  JMBG: string = '';
  mestoStanovanja: string = '';
  adresaStanovanja: string = '';
  brojTelefona: string = '';
  imejl: string = '';
  musko: boolean = false;
  zensko: boolean = false;
  titula: string = '';
  zanimanje: string = '';
  odeljenje: string = '';
  admin: boolean = false;
  dr_spec_odeljenja: boolean = false;
  dr_spec: boolean = false;
  visa_med_sestra: boolean = false;
  med_sestra: boolean = false;
  dr_spec_pov: boolean = false;




  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  // addEmployee(){
  //   this.userService.addEmployee(this.ime, this.prezime, this.datumRodjenja, this.JMBG, this.mestoStanovanja, this.adresaStanovanja
  //   , this.brojTelefona, this.imejl, this.musko, this.zensko, this.titula, this.zanimanje, this.odeljenje,
  //     this.admin, this.dr_spec_odeljenja, this.dr_spec, this.visa_med_sestra, this.med_sestra, this.dr_spec_pov).subscribe((response) => {
  //   }, error => {
  //     console.log(error)
  //
  //   })
  //
  // }



}
