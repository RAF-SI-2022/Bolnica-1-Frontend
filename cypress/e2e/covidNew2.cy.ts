/*
uloguje se kao lisa.jones
pretrazi svoje smene

pretrazi statistiku, po datumu, polu i starosti pojedinacno i vidi sve grafove

*/


describe("Nurse checking shifts and statistics", () => {

  beforeEach(() => {
    cy.login("lisa.jones", "password", "/nurse-workspace");

  });

  it("Should search for the my shifts", () => {
    cy.visit("/nurse-my-shifts");
    cy.get("[data-cy='dateFrom']").type("2023-07-20");
    cy.get("[data-cy='dateTo']").type("2023-07-30");
    cy.get("[data-cy='pretrazi']").click({ force: true });
  });


  it("Should check statistics and navigate to details", () => {
    cy.visit("/nurse-covid-statistics");
    cy.get("[data-cy='dateFrom']").type("2023-07-20");
    cy.get("[data-cy='dateTo']").type("2023-07-30");

    cy.get("select[data-cy='pol']").select("MUSKI");
    cy.get("select[data-cy='godine']").select("Do 20 godina");

    cy.get("[data-cy='btnPretrazi']").click({ force: true });


    cy.contains("Pozitivni:").should("be.visible");
    cy.contains("Negativni:").should("be.visible");
    cy.contains("Hospitalizovani:").should("be.visible");

    cy.scrollTo('bottom');

  });


});
