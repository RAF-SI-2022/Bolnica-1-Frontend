
describe("Covid workflow", ()=>{

  it("Nurse should add exam for a patient",()=>{
    cy.login("lisa.jones","password","/nurse-workspace")
    cy.visit("/nurse-covid-ambulance")

    cy.get("[data-cy='lbp']").type("P0004 : Adam (Lee)",{force:true})
    cy.get("[data-cy='selectStatus']").select('PRVI');
    cy.get("[data-cy='doctorSelect']").click()
    cy.get("[ng-reflect-ng-item-label='Jane Smith']").click({force:true})

    cy.get("[data-cy='dodajBtn']").click();

    cy.visit("/nurse-covid-ambulance")

  })

  it("Nurse should check statistics",()=>{
    cy.login("lisa.jones","password","/nurse-workspace")
    cy.visit("/nurse-covid-statistics")
  })

  it("Doctor should complete exam",()=>{
    cy.login("jane.smith","password","/doctor-workspace")
    cy.visit("/doctor-covid-waiting-room")
    cy.contains("Pregled").last().click()


    cy.get("[data-cy='Simptomi']").type("Nema culo mirisa i ukusa.",{force:true})
    cy.get("[data-cy='Trajanje']").type("5 dana.",{force:true})
    cy.get("[data-cy='Temperatura']").type("38.5",{force:true})
    cy.get("[data-cy='Pritisak']").type("120.",{force:true})
    cy.get("[data-cy='Saturacija']").type("Velika",{force:true})
    cy.get("[data-cy='StanjePluca']").type("Lose",{force:true})
    cy.get("[data-cy='Terapija']").type("Brufen.",{force:true})
    cy.get("[data-cy='Savet']").type("Odmor.",{force:true})

    cy.get("[data-cy='btnZavrsi']").click({force:true})

    cy.visit("/doctor-covid-waiting-room")

  })

  it("Doctor should check statistics",()=>{
    cy.login("jane.smith","password","/doctor-workspace")
    cy.visit("/doctor-covid-statistics")
  })

})
