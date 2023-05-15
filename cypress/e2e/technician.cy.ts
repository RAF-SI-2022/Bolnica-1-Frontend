/// <reference types="cypress" />


describe("Technician schedule lab appointment", ()=>{
    beforeEach(()=>{
        cy.login("paul.davis","password","/technician-workspace")
        cy.visit("/technician-schedule-lab-examination")
      })

      it("Should add a patient appointment to a doctor",()=>{
        cy.get("[data-cy='patients1']").click()
        cy.get("[ng-reflect-ng-item-label='P0005']").click({force:true})
        cy.get("[data-cy='pretrazi1']").click()
        cy.contains("LABORATORIJA").should("be.visible")
        cy.get("[data-cy='date']").type("2023-05-15")
        cy.get("[data-cy='btnCount']").click()
        cy.get("[data-cy='napomena']").type("Hitno!")
        cy.get("[data-cy='btnZakazi']").click()
        cy.contains("Uspesno dodat pregled").should("be.visible")
    })

    it("Should check patients appointments and cancel one",()=>{
        cy.get("[data-cy='pregledTab']").click()
        cy.get("[data-cy='patients2']").click()
        cy.get("[ng-reflect-ng-item-label='P0005']").click({force:true})
        cy.get("[data-cy='correctDate']").type("2023-05-15")
        cy.get("[data-cy='pretrazi2']").click()
        cy.contains("ZAKAZANO").should("be.visible")
        cy.get("[class='btn btn-primary']").contains("Otkaži").last().click()
        cy.contains("Uspesno otkazano!").should("be.visible")
    })

    it("Should finish the scheduled appointment",()=>{
      cy.get("[data-cy='patients1']").click()
      cy.get("[ng-reflect-ng-item-label='P0005']").click({force:true})
      cy.get("[data-cy='pretrazi1']").click()
      cy.contains("LABORATORIJA").should("be.visible")
      cy.get("[data-cy='date']").type("2023-05-15")
      cy.get("[data-cy='btnCount']").click()
      cy.get("[data-cy='napomena']").type("Manje hitno")
      cy.get("[data-cy='btnZakazi']").click()
      cy.contains("Uspesno dodat pregled").should("be.visible")
      cy.visit("/technician-patient-admission")
      cy.get("[data-cy='lbp_patient']").type("P0005")
      cy.get("[data-cy='pretrazi_patient']").click({force:true})
      cy.contains("Završi").last().click()
      cy.contains("Uspesno zavrseno!").should("be.visible")
  })

  })
