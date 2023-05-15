/// <reference types="cypress" />


describe("Technician schedule lab appointment", ()=>{
    beforeEach(()=>{
        cy.login("linda.garcia","password","/biochemist-workspace")
        cy.visit("/biochemist-daily")
      })
  
      it("Should search for the patients account",()=>{
        cy.visit("/biochemist-search")
        cy.get("[data-cy='dateFrom']").type("2023-05-07")
        cy.get("[data-cy='dateTo']").type("2023-05-10")
        cy.get("[data-cy='lbp']").type("P0005")
        cy.get("[data-cy='pretrazi']").click({force:true})
        cy.contains("U_OBRADI").should("be.visible")
    })

      it("Should enter the patients results",()=>{
        cy.contains("P0005").last().click({force:true})
        cy.get("[data-cy='rezultat']").type("10")
        cy.get("[data-cy='sacuvaj']").last().click({force:true})
        cy.get("[data-cy='verifikuj']").last().click({force:true})
        cy.contains("Verifikovan uspesno!").should("be.visible")
    })

  })