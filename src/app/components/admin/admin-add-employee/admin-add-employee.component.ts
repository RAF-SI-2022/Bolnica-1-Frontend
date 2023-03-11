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
  ADMIN: boolean = false;
  DR_SPEC_ODELJENJA: boolean = false;
  DR_SPEC: boolean = false;
  VISA_MED_SESTRA: boolean = false;
  MED_SESTRA: boolean = false;
  DR_SPEC_POV: boolean = false;
  RECEPCIONER: boolean = false;
  VISI_LABORATORIJSKI_TEHNICAR: boolean = false;
  LABORATORIJSKI_TEHNICAR: boolean = false;
  MEDICINSKI_BIOHEMICAR: boolean = false;
  SPECIJALISTA_MEDICINSKE_BIOHEMIJE: boolean = false;


  errorMessage: string = ''
  successMessage: string = ''


  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  addEmployee(){

    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if(form.checkValidity() === false){
    }

    form.classList.add('was-validated');
   
    this.userService.addEmployee(this.ime, this.prezime, this.datumRodjenja, this.JMBG, this.mestoStanovanja, this.adresaStanovanja
    , this.brojTelefona, this.imejl, this.musko, this.zensko, this.titula, this.zanimanje, this.odeljenje,
      this.ADMIN, this.DR_SPEC_ODELJENJA, this.DR_SPEC, this.VISA_MED_SESTRA, this.MED_SESTRA, this.DR_SPEC_POV, this.RECEPCIONER,
      this.VISI_LABORATORIJSKI_TEHNICAR, this.LABORATORIJSKI_TEHNICAR, this.MEDICINSKI_BIOHEMICAR, this.SPECIJALISTA_MEDICINSKE_BIOHEMIJE).subscribe((response) => {

      this.errorMessage = ''
      this.successMessage = 'Uspesno dodavanje'

    }, error => {
      this.successMessage = ''
      this.errorMessage = 'Zahtev neuspesan'

    })

  }



}
