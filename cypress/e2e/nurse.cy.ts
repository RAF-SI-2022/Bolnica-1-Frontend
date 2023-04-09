/// <reference types="cypress" />

describe("Nurse Add Patient", ()=>{
    beforeEach(()=>{
        cy.login("james.williams","password","/nurse-workspace")
        cy.visit("/nurse-add-patient")
    })
  
    it("Should showcase error when not entering required parameters to add a new patient",()=>{
        cy.get("[data-cy='button']").contains("Napravi").click()
        cy.contains("Unesite vase ime").should("be.visible")
        cy.contains("Unesite ime roditelja!").should("be.visible")
        cy.contains("Unesite vase prezime!").should("be.visible")
        cy.contains("Unesite vas JMBG!").should("be.visible")
        cy.contains("Unesite datum rodjenja!").should("be.visible")
        cy.contains("Unesite mesto rodjenja!").should("be.visible")
        cy.contains("Unesite zemlju drzavljanstva!").should("be.visible")
        cy.contains("Unesite mesto rodjenja!").should("be.visible")
    })

  
    it("Should unmark fields after entering valid inputs and save the new patient",()=>{
        cy.get("[class='bi bi-list toggle-sidebar-btn']").click({force:true})
        cy.get("[data-cy='button']").contains("Napravi").click()
        cy.get("[data-cy='firstName']").type("Pera",{force:true})
        cy.contains("Unesite vase ime!").should("not.be.visible")
        cy.get("[data-cy='middleName']").type("Vera",{force:true})
        cy.contains("Unesite ime roditelja!").should("not.be.visible")
        cy.get("[data-cy='lastName']").type("Peric",{force:true})
        cy.contains("Unesite vase prezime!").should("not.be.visible")
        cy.get("[data-cy='JMBG']").type("1234567890123",{force:true})
        cy.contains("Unesite vas JMBG!").should("not.be.visible")
        cy.get("[data-cy='genderSlider']").click({force:true})
        cy.get("[data-cy='dateOfBirth']").type("1999-12-31")
        cy.contains("Unesite datum rodjenja!").should("not.be.visible")
        cy.get("[data-cy='placeOfBirth']").type("Beograd",{force:true})
        cy.contains("Unesite mesto rodjenja!").should("not.be.visible")
        cy.get("[data-cy='countryOfBirth']").type("SRB",{force:true}).select("SRB").invoke("val").should("eq","SRB")
        cy.contains("Unesite zemlju drzavljanstva!").should("not.be.visible")
        cy.get("[data-cy='city']").type("Beograd",{force:true})
        cy.get("[data-cy='phone']").type("063123456",{force:true})
        cy.get("[data-cy='email']").type("peraperic@gmail.com",{force:true})
        cy.get("[data-cy='guardianName']").type("Vera",{force:true})
        cy.get("[data-cy='guardianJMBG']").type("9876543210321",{force:true})
        cy.get("[data-cy='familyStatus']").select("OBA_RODITELJA").invoke("val").should("eq","OBA_RODITELJA")
        cy.get("[data-cy='maritalStatus']").select("SAMAC_SAMICA").invoke("val").should("eq","SAMAC_SAMICA")
        cy.get("[data-cy='numberOfChildren']").type("0",{force:true})
        cy.get("[data-cy='education']").select("SREDNJE").invoke("val").should("eq","SREDNJE")
        cy.get("[data-cy='job']").type("Student",{force:true})
        cy.get("[data-cy='button']").contains("Napravi").click()
        cy.contains("Uspesno dodat pacijent!").should("be.visible")
    })
})

describe("Nurse Edit Patient", ()=>{
    beforeEach(()=>{
        cy.login("lisa.jones","password","/nurse-workspace")
        cy.visit("/nurse-search-patients")
    })    

    it("Should edit newly created patient and then delete the user",()=>{
        cy.get("[data-cy='ime']").clear().type("Marko",{force:true})
        cy.get("[data-cy='pretrazi']").contains("Pretrazi").click()
        cy.get("[class='settings']").last().click()
        cy.url().should('contain', "/nurse-edit-patient")
        cy.get("[data-cy='firstName']").clear().type("Marko",{force:true})
        cy.get("[data-cy='surname']").clear().type("Markovic",{force:true})
        cy.get("[data-cy='button']").contains("Napravi").click()
        cy.contains("Uspesno sacuvan pacijent!").should("be.visible")
        cy.visit("/nurse-search-patients")
        cy.contains("Marko").should("be.visible")
        cy.contains("Markovic").should("be.visible")
    })

})