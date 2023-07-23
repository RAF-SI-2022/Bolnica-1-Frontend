/*
uloguje se kao lisa.jones
udje na stranicu zakazivanje prijema i zakaze za danas za pacijenta za kog je kreirao uput na stacionar prethodno
udje na stranicu danasnji prijemi i klikom na prijem ide dalje
na stranici prijem on primi pacijenta i kao doktora izabere mary.johnson
ide na pacijenti na odeljenju i udje na tog pacijenta, zatim ga stavi na respirator
 */

describe("Nurse adding patient to covid hospital", () => {

  beforeEach(() => {
    cy.login("lisa.jones", "password", "/nurse-workspace");

  });

  it("Nurse should admit the patient to the covid infirmary",()=>{
    cy.visit("/nurse-infirmary-schedule-admission")
    cy.get("[data-cy='lbp']").type("P0004 : Adam (Lee)",{force:true})
    cy.get("[data-cy='pretrazi']").click()
    cy.get("[data-cy='sacuvaj']").last().click()
    cy.get("[data-cy='note']").type("Hitno!",{force:true})
    cy.get("[data-cy='button']").click()

    cy.contains("Uspesno zakan prijem!").should("be.visible");

    cy.visit("/nurse-infirmary-search-admission")
    cy.get("[data-cy='lbp']").type("P0004 : Adam Lee",{force:true})
    cy.contains("ZAKAZAN").should("be.visible")

    cy.visit("/nurse-infirmary-scheduled-patients")
    cy.get("[data-cy='lbp']").type("P0004 : Adam Lee",{force:true})
    cy.get("[data-cy='prijem']").last().click()
    cy.url().should('eq', 'http://localhost:4200/nurse-infirmary-patient-admission')
    cy.get("[data-cy='odabirSobe']").last().click()

    cy.get("[data-cy='doctorSelect']").scrollIntoView().type("Mary Johnson");
    cy.get(".ng-option").first().click();
    cy.get("[data-cy='note']").type("Hitno!",{force:true})
    cy.get("[data-cy='button']").click()

    cy.contains("Uspesno registrovan prijem!").should("be.visible");


  })


  it("Nurse should check in on patient and put him on ventilator",()=>{
    cy.login("lisa.jones","password","/nurse-workspace")
    cy.visit("/nurse-infirmary-workspace")
    cy.get("[data-cy='lbp']").type("P0004 : Adam (Lee)",{force:true})
    cy.get("[data-cy='pretrazi']").click()

    cy.contains("Adam").click({force:true})
    cy.contains("Pacijent na stacionaru").should("be.visible")

    cy.get("[data-cy='btnAdd']").click()
    cy.contains("Sacuvana izmena!").should("be.visible");

    cy.get("[data-cy='btnRemove']").click()
    cy.contains("Sacuvana izmena!").should("be.visible");
  })


});
