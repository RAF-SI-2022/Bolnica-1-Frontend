/*
udje na stranicu zakazivanje vakcina i zakaze za nekog pacijenta
udje na stranicu dnevne vakcinacije i klikne na zapocni
klikne na sacuvaj vakcinu, saceka poruku uspesno zavrseno, zatim klikne na nazad
udje na stranicu kovid sertifikat i izabere pacijenta kog je upravo vakcinisao i posalje sertifikat klikom na posalji, saceka poruku da li je poslato
*/


describe("Nurse adding vaccines", () => {

  beforeEach(() => {
    cy.login("lisa.jones", "password", "/nurse-workspace");

  });

  it("Should schedule vaccination", () => {
    cy.visit("/nurse-schedule-vaccination");

    cy.get("[data-date='1690147800000']").scrollIntoView().dblclick();
    cy.get("[data-cy='vaccine']").type("Covid Pfizer");
    cy.get(".ng-option").first().click();
    cy.get("[data-cy='patient']").type("John Smith");
    cy.get(".ng-option").first().click();
    cy.get("[data-cy='dodajBtn']").click();
  })

  it("Should vaccine patient",()=>{
    cy.visit("/nurse-daily-vaccination");
    cy.get("[data-cy='btnVaccine']").last().click()
    cy.get("[data-cy='btnFinish']").click()
    cy.contains("Uspesno sacuvano!").should("be.visible");
  })

  it("Should send certificate",()=>{
    cy.visit("/nurse-covid-certificate");
    cy.get("[data-cy='lbp']").type("P0002 - John (Smith)",{force:true})
    cy.get("[data-cy='btnPosalji']").click()
    cy.contains("Uspesno poslat sertifikat").should("be.visible");
  })


});
