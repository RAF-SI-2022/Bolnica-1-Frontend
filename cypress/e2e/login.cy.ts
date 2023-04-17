/// <reference types="cypress" />


describe("Login Dashboard", ()=>{
  beforeEach(()=>{
      cy.visit("/login")
  })

  it("Should showcase error when not entering required parameters to login",()=>{
    cy.get(".btn-primary").click()
    cy.contains("Unesite korisnicko ime!").should("be.visible")
    cy.contains("Unesite lozinku!").should("be.visible")
  })

  it("Should unmark the fields after entering valid inputs but not login with bad credentials",()=>{
    cy.get("#username").type("Pera@peric.rs")
    cy.contains("Unesite korisnicko ime!").should("not.be.visible")
    cy.get("#yourPassword").type("mypassword")
    cy.contains("Unesite lozinku!").should("not.be.visible")
    cy.get(".btn-primary").click()
    cy.contains("Neispravni kredencijali!").should("be.visible")
  })

  it("Should reopen main page with reset fields on logo click",()=>{
    cy.get("#username").type("Pera@peric.rs")
    cy.get("#yourPassword").type("mypassword")
    cy.get("[class='logo d-flex align-items-center w-auto']").click()
    cy.get("#username").should("be.empty")
    cy.get("#yourPassword").should("be.empty")
  })

  it("Should login with correct credentials inserted",()=>{
    cy.get("#username").type("johndoe")
    cy.get("#yourPassword").type("password1")
    cy.get(".btn-primary").click()
  })
})

describe("Reset Password Dashboard", ()=>{
  beforeEach(()=>{
    cy.login("john.doe","password","/admin-workspace")
  })

  it("Should get to reset login page",()=>{
    cy.get("[class='d-none d-md-block dropdown-toggle ps-2']").click()
    cy.get("[data-popper-placement='bottom-end']").should("have.class","show")
    cy.get("[class='dropdown-item d-flex align-items-center']").contains("Moj profil").click()
    cy.get("[class='btn btn-primary']").contains("Resetuj lozinku").click({force:true})
    cy.url().should('be.equal', 'http://localhost:4200/new-password')
  })
})