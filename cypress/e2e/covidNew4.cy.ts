/*
uloguje se kao lisa.jones
na stranici zakazivanje pregleda zakaze pregled za nekog pacijenta kod doktora mary.johnson
ide na stranicu zakazani pregledi i promeni status pregleda na CEKA
*/

describe("Nurse Schedule Appointment and Status change", ()=>{
  beforeEach(()=>{
    cy.login("lisa.jones","password","/nurse-workspace")
  })

  it("Should add a patient appointment to a doctor",()=>{
    cy.visit("/nurse-schedule-appointment")
    cy.get("[data-cy='doctorSelect']").type("Mary Johnson");
    cy.get(".ng-option").first().click();

    cy.get("[data-cy='pretraziButton']").click();

    cy.get("[data-date='1690147800000']").scrollIntoView().dblclick();
    cy.get("[data-cy='razlog']").select('Pregled')
    cy.get("[data-cy='patient']").click()
    cy.get("[ng-reflect-ng-item-label='Adam Lee']").click({force:true})
    cy.get("[data-cy='dodajBtn']").click()
  })

  it("Should set the patient to waiting",()=>{
    cy.get("[data-cy='doctorSelect']").type("Mary Johnson");
    cy.get(".ng-option").first().click();
    cy.get("[data-cy='pretraziBtn']").click()
    cy.get("[data-cy='selectStatus']").last().select('CEKA')
    cy.get("[data-cy='azurirajBtn']").last().click()
  })

})
