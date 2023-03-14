/// <reference types="cypress" />

describe("Admin Add Employee", ()=>{
    beforeEach(()=>{
        cy.visit("/admin-add-employee")
    })
  
    it("Should showcase error when not entering required parameters to add a new employee",()=>{
        cy.get("[type='submit']").contains("Napravi").click()
        cy.contains("Ime je obavezno!").should("be.visible")
        cy.contains("Unesite vase prezime").should("be.visible")
        cy.contains("Unesite vas imejl").should("be.visible")
        cy.contains("Unesite vas broj telefona").should("be.visible")
        cy.contains("Unesite vas JMBG").should("be.visible")
        cy.contains("Unesite vasu adresu stanovanja").should("be.visible")
        cy.contains("Unesite vase mesto stanovanja").should("be.visible")
        cy.get("[name='title']",).should("have.class","ng-invalid")
        cy.get("[name='profession']",).should("have.class","ng-invalid")
        cy.contains("Zahtev neuspesan").should("be.visible")
    })

  
    it("Should mark fields with  after entering valid inputs",()=>{
        cy.get("[class='bi bi-list toggle-sidebar-btn']").click({force:true})
        cy.get("[type='submit']").contains("Napravi").click()
        cy.get("input[name='name']").type("Pera",{force:true})
        cy.contains("Ime je obavezno!").should("not.be.visible")
        cy.get("input[name='lastName']").type("Peric",{force:true})
        cy.contains("Unesite vase prezime").should("not.be.visible")
        cy.get("input[name=' gender']").click({force:true})
        cy.get("input[name='email']").type("pera",{force:true})
        cy.contains("Unesite vas imejl").should("be.visible")
        cy.get("input[name='email']").type("pera@peric.rs",{force:true})
        cy.contains("Unesite vas imejl").should("not.be.visible")
        cy.get("input[name='phoneNumber']").type("+38169123456",{force:true})
        cy.contains("Unesite vas broj telefona").should("not.be.visible")
        cy.get("input[name='JMBG']").type("250365452654",{force:true})
        cy.contains("Unesite vas JMBG").should("not.be.visible")
        cy.get("input[name='adress']").type("Ulica 5",{force:true})
        cy.contains("Unesite vasu adresu stanovanja").should("not.be.visible")
        cy.get("input[name='city']").type("Beograd",{force:true})
        cy.contains("Unesite vase mesto stanovanja").should("not.be.visible")
        cy.get("select[name='title']").select("Prof. dr. med").invoke("val").should("eq","PROF_DR_MED")      
        cy.get("select[name='profession']").select("Spec. neurolog").invoke("val").should("eq","SPEC_NEUROLOG")
        cy.contains("Doktor specijalista").click({force:true}) 

    })
})
//     it("Should reopen main page with reset fields on logo click",()=>{
//       cy.get("#username").type("Pera@peric.rs")
//       cy.get("#yourPassword").type("mypassword")
//       cy.get("[class='logo d-flex align-items-center w-auto']").click()
//       cy.get("#username").should("be.empty")
//       cy.get("#yourPassword").should("be.empty")
//     })
  
//     it("Should go to reset-password-page when 'Resetuj lozinku' is pressed",()=>{
//       cy.get("[href='/reset-password']").click()
//       cy.url().should('be.equal', 'http://localhost:4200/reset-password')
//       cy.contains("Zaboravljena lozinka?").should("be.visible")
//     })
  
//     it("Should reopen main page with reset fields on Pocetna click",()=>{
//       cy.get("#username").type("Pera@peric.rs")
//       cy.get("#yourPassword").type("mypassword")
//       cy.get("[href='/']").contains("Pocetna").click()
//       cy.url().should('be.equal', 'http://localhost:4200/')
//       cy.contains("Prijavi se").should("be.visible")
//       cy.get("#username").should("be.empty")
//       cy.get("#yourPassword").should("be.empty")
//     })
  
//     it("Should go to profile page when 'Profil' is clicked",()=>{
//       cy.get("[href='/profile']").contains("Profil").click()
//       cy.url().should('be.equal', 'http://localhost:4200/profile')
//       cy.contains("Profil").should("be.visible")
//     })
  
//     it("Should go to admin-search-employee page when 'Pretraga zaposlenih' is clicked",()=>{
//       cy.get("[href='/admin-search-employee']").click()
//       cy.url().should('be.equal', 'http://localhost:4200/admin-search-employee')
//       cy.contains("Pretraga zaposlenih").should("be.visible")
//     })
  
//     it("Should go to admin-add-employee page when 'Dodaj zaposlenog' is clicked",()=>{
//       cy.get("[href='/admin-add-employee']").click()
//       cy.url().should('be.equal', 'http://localhost:4200/admin-add-employee')
//       cy.contains("Napravi").should("be.visible")
//     })
//   })
  
//   describe("Reset Password Dashboard", ()=>{
//     beforeEach(()=>{
//         cy.visit("/reset-password")
//     })
  
//     it("Should reset password for inserted username",()=>{
//       cy.get("#yourUsername").type("Pera@peric.rs")
//       cy.contains("Resetuj").click()
//     })
  
//     it("Should go back to login screen after clicking prijavu",()=>{
//       cy.get("[href='/']").contains("prijavu").click()
//       cy.url().should('be.equal', 'http://localhost:4200/')
//       cy.contains("Prijavi se").should("be.visible")
//     })
//   })