/// <reference types="cypress" />

describe("Admin Add/Delete Employee", ()=>{
    beforeEach(()=>{
        cy.login("john.doe","password", "/admin-workspace")
        cy.visit("/admin-add-employee")
    })
  
    it("Should showcase error when not entering required parameters to add a new employee",()=>{
        cy.get("[type='submit']").contains("Napravi").click()
        cy.contains("Neuspeh: Izaberite barem 1 privilegiju!").should("be.visible")
        // cy.contains("Unesite vase ime").should("be.visible")
        // cy.contains("Unesite vase prezime").should("be.visible")
        // cy.contains("Email mora da bude na domenu @ibis.rs").should("be.visible")
        // cy.contains("Unesite vas broj telefona").should("be.visible")
        // cy.contains("Unesite vas JMBG").should("be.visible")
        // cy.contains("Unesite vasu adresu stanovanja").should("be.visible")
        // cy.contains("Unesite vase mesto stanovanja").should("be.visible")
        // cy.get("[name='title']",).should("have.class","ng-invalid")
        // cy.get("[name='profession']",).should("have.class","ng-invalid")
    })

  
    it("Should unmark fields after entering valid inputs and save the new user",()=>{
        cy.get("[class='bi bi-list toggle-sidebar-btn']").click({force:true})
        cy.get("[type='submit']").contains("Napravi").click()
        cy.get("input[name='name']").type("Pera",{force:true})
        cy.contains("Unesite vase ime").should("not.be.visible")
        cy.get("input[name='lastName']").type("Peric",{force:true})
        cy.contains("Unesite vase prezime").should("not.be.visible")
        cy.get("input[name=' gender']").click({force:true})
        cy.get("input[name='email']").type("pera",{force:true})
        // cy.contains("Email mora da bude na domenu @ibis.rs").should("be.visible")
        cy.get("input[name='email']").type("pera.peric@hospital.com",{force:true})
        // cy.contains("Email mora da bude na domenu @ibis.rs").should("not.be.visible")
        cy.get("input[name='phoneNumber']").type("+38169123456",{force:true})
        cy.contains("Unesite vas broj telefona").should("not.be.visible")
        cy.get("input[name='JMBG']").type("250365452654",{force:true})
        cy.contains("Unesite vas JMBG").should("not.be.visible")
        cy.get("input[name='adress']").type("Ulica 5",{force:true})
        cy.contains("Unesite vasu adresu stanovanja").should("not.be.visible")
        cy.get("input[name='city']").type("Beograd",{force:true})
        cy.contains("Unesite vase mesto stanovanja").should("not.be.visible")
        cy.get("input[name='date']").type("1999-12-31")
        cy.get("select[name='title']").select("Prof. dr. med").invoke("val").should("eq","PROF_DR_MED") 
        cy.get("select[name='odeljenje']").select("Cardiology").invoke("val").should("eq","D001")     
        cy.get("select[name='profession']").select("Spec. neurolog").invoke("val").should("eq","SPEC_NEUROLOG")
        cy.contains("Doktor specijalista").click({force:true}) 
        cy.get("[type='submit']").contains("Napravi").click()
        cy.contains("Korisnik uspesno dodat!").should("be.visible")
    })

    it("Should delete newly created user",()=>{
        cy.visit("/")
        cy.get("[class='bi bi-list toggle-sidebar-btn']").click()
        cy.get("[class='btn btn-primary']").contains("Kreni").click({force:true})
        cy.get("input[name='ime']").type("Pera")
        cy.get("[class='btn btn-primary']").contains("Pretrazi").click()
        cy.get("[class='settings']").last().click()
        cy.get("input[name='deleted']").click()
        cy.get("[class='btn btn-primary']").contains("Sacuvaj").click()
        cy.visit("/admin-search-employee")
    })

})
