/// <reference types="cypress" />

describe("Doctor Search Patient", ()=>{
    beforeEach(()=>{
        cy.login("jane.smith","password","/doctor-workspace")
        cy.visit("/doctor-search-patients")
    })    

    it("Should search for a patient",()=>{
        cy.get("[data-cy='ime']").clear().type("Marko",{force:true})
        cy.get("[data-cy='pretrazi']").contains("Pretrazi").click()
    })

})