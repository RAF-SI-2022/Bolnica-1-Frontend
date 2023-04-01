import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user-service/user.service";
import {ActivatedRoute} from "@angular/router";
import {AdminPromeniZaposlenog, UlogeZaposlenog} from "../../../models/models";
import {PatientService} from "../../../services/patient-service/patient.service";
import {PatientUpdateClass} from "../../../models/patient/PatientUpdate";
import {CountryCode} from "../../../models/patient-enums/CountryCode";
import {FamilyStatus} from "../../../models/patient-enums/FamilyStatus";
import {MaritalStatus} from "../../../models/patient-enums/MaritalStatus";
import {ExpertiseDegree} from "../../../models/patient-enums/ExpertiseDegree";

@Component({
  selector: 'app-nurse-edit-patient',
  templateUrl: './nurse-edit-patient.component.html',
  styleUrls: ['./nurse-edit-patient.component.css']
})
export class NurseEditPatientComponent implements OnInit {
    
    countryCodes = this.filterEnum(CountryCode);
    familyStatus = this.filterEnum(FamilyStatus);
    maritalStatus = this.filterEnum(MaritalStatus);
    expertiseDegree = this.filterEnum(ExpertiseDegree);
    successMessage = '';
    errorMessage = '';

    patientUpdate: PatientUpdateClass;
    editGroup: FormGroup;
    deleted = false;

    lbp = '';

    constructor(private formBuilder: FormBuilder, private patientService: PatientService, private route: ActivatedRoute) {
        this.editGroup = this.createFormGroup();
        this.patientUpdate = new PatientUpdateClass();
    }

    ngOnInit(): void {
        this.lbp = this.route.snapshot.paramMap.get('lbp') || '';
        this.getPatient(this.lbp);
    }

    filterEnum(enumObject: any): string[] {
        return Object.values(enumObject).filter((value) => typeof value === 'string') as string[];
    }
    
    createFormGroup(): FormGroup {
        return this.formBuilder.group({
            jmbg: ['', [Validators.required]],
            name: ['', [Validators.required]],
            parentName: ['', [Validators.required]],
            surname: ['', [Validators.required, Validators.email]],
            gender: ['', [Validators.required]],
            dateOfBirth: ['', [Validators.required]],
            dateAndTimeOfDeath: ['', [Validators.required]],
            birthPlace: ['', [Validators.required]],
            placeOfLiving: ['', [Validators.required]],
            citizenship: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            email: ['', [Validators.required]],
            guardianJmbg: ['', [Validators.required]],
            guardianNameAndSurname: ['', [Validators.required]],
            maritalStatus: ['', [Validators.required]],
            numOfChildren: ['', [Validators.required]],
            expertiseDegree: ['', [Validators.required]],
            profession: ['', [Validators.required]],
            familyStatus: ['', [Validators.required]],
        });
    }

    getPatient(LBP: string): void {
        this.patientService.getPatientByLbp(LBP).subscribe(
            (result) => {
                this.patientUpdate = result;
            },
            (err) => {
                if (err.status === 302) {
                    this.patientUpdate = err.error;
                    this.editGroup.get('gender')?.setValue(this.patientUpdate.gender.toLowerCase() === 'female');
                }
            }
        );
    }

    editPatient(): void {
        if (this.editGroup.invalid) return;

        const updatedPatient = { ...this.editGroup.value, deleted: this.deleted };
        this.patientService.updatePatient(
            this.lbp,
            updatedPatient.jmbg,
            updatedPatient.name,
            updatedPatient.parentName,
            updatedPatient.surname,
            updatedPatient.gender,
            updatedPatient.dateOfBirth,
            updatedPatient.dateAndTimeOfDeath,
            updatedPatient.birthPlace,
            updatedPatient.placeOfLiving,
            updatedPatient.citizenship,
            updatedPatient.phone,
            updatedPatient.email,
            updatedPatient.guardianJmbg,
            updatedPatient.guardianNameAndSurname,
            updatedPatient.maritalStatus,
            updatedPatient.numOfChildren,
            updatedPatient.expertiseDegree,
            updatedPatient.profession,
            updatedPatient.familyStatus,
            updatedPatient.deleted
        ).subscribe(
            response => {
                this.showSuccessMessage('Uspesno sacuvan pacijent!');
            },
            error => {
                this.errorMessage = '';
            }
        );
    }

    showSuccessMessage(message: string): void {
        this.errorMessage = '';
        this.successMessage = message;
        setTimeout(() => {
            this.successMessage = '';
        }, 3000);
    }

    showErrorMessage(message: string): void {
        this.errorMessage = message;
        setTimeout(() => {
            this.errorMessage = '';
        }, 3000);
    }

}
