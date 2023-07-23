/*
uloguje se kao mary.johnson
udje na smene - zakaze mary johnson za prvu smenu, zakaze lisu jones za prvu smenu
udje na stranicu moje smene i proveri da li je nova smena tu
*/

describe("Creating shifts", () => {

  beforeEach(() => {
    cy.login("mary.johnson", "password", "/doctor-workspace");
    cy.visit("/doctor-schedule-shifts");
  });

  it("Doctor should create shift for himself", () => {
    cy.get("[data-cy='date1']").type("2023-07-23");
    cy.get("select[data-cy='smena1']").select("Druga 16-00");
    cy.get("[data-cy='patients1']").type("Mary Johnson").type("{enter}");

    cy.get("[data-cy='btnZakazi1']").click();

    cy.contains("Uspesno sacuvano!").should("be.visible");
  });

  it("Doctor should create shift for nurse", () => {
    cy.scrollTo('bottom');
    cy.get("[data-cy='date2']").type("2023-07-23");
    cy.get("select[data-cy='smena2']").select("Druga 16-00");
    cy.get("[data-cy='nurses']").type("Lisa Jones").type("{enter}");

    cy.get("[data-cy='btnZakazi2']").click();

    cy.contains("Uspesno sacuvano!").should("be.visible");
  });

  it("Should search for the my shifts", () => {
    cy.visit("/doctor-my-shifts");
    cy.get("[data-cy='dateFrom']").type("2023-07-22");
    cy.get("[data-cy='dateTo']").type("2023-07-30");
    cy.get("[data-cy='pretrazi']").click({ force: true });
  });
});
