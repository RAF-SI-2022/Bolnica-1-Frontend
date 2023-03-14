/// <reference types="cypress" />

describe("Login Dashboard", ()=>{
  beforeEach(()=>{
      cy.visit("/")
  })

  it("Should showcase error when not entering required parameters to login",()=>{
    cy.get(".btn-primary").click()
    cy.contains("Unesite korisnicko ime!").should("be.visible")
    cy.contains("Unesite lozinku!").should("be.visible")
  })

  it("Should mark fields with  after entering valid inputs",()=>{
    cy.get("#username").type("Pera@peric.rs")
    cy.contains("Unesite korisnicko ime!").should("not.be.visible")
    cy.get("#yourPassword").type("mypassword")
    cy.contains("Unesite lozinku!").should("not.be.visible")
  })

  it("Should reopen main page with reset fields on logo click",()=>{
    cy.get("#username").type("Pera@peric.rs")
    cy.get("#yourPassword").type("mypassword")
    cy.get("[class='logo d-flex align-items-center w-auto']").click()
    cy.get("#username").should("be.empty")
    cy.get("#yourPassword").should("be.empty")
  })

  it("Should go to reset-password-page when 'Resetuj lozinku' is pressed",()=>{
    cy.get("[href='/reset-password']").click()
    cy.url().should('be.equal', 'http://localhost:4200/reset-password')
    cy.contains("Zaboravljena lozinka?").should("be.visible")
  })

  it("Should reopen main page with reset fields on Pocetna click",()=>{
    cy.get("#username").type("Pera@peric.rs")
    cy.get("#yourPassword").type("mypassword")
    cy.get("[href='/']").contains("Pocetna").click()
    cy.url().should('be.equal', 'http://localhost:4200/')
    cy.contains("Prijavi se").should("be.visible")
    cy.get("#username").should("be.empty")
    cy.get("#yourPassword").should("be.empty")
  })

  it("Should go to profile page when 'Profil' is clicked",()=>{
    cy.get("[href='/profile']").contains("Profil").click()
    cy.url().should('be.equal', 'http://localhost:4200/profile')
    cy.contains("Profil").should("be.visible")
  })

  it("Should go to admin-search-employee page when 'Pretraga zaposlenih' is clicked",()=>{
    cy.get("[href='/admin-search-employee']").click()
    cy.url().should('be.equal', 'http://localhost:4200/admin-search-employee')
    cy.contains("Pretraga zaposlenih").should("be.visible")
  })

  it("Should go to admin-add-employee page when 'Dodaj zaposlenog' is clicked",()=>{
    cy.get("[href='/admin-add-employee']").click()
    cy.url().should('be.equal', 'http://localhost:4200/admin-add-employee')
    cy.contains("Napravi").should("be.visible")
  })
})

describe("Reset Password Dashboard", ()=>{
  beforeEach(()=>{
      cy.visit("/reset-password")
  })

  it("Should reset password for inserted username",()=>{
    cy.get("#yourUsername").type("Pera@peric.rs")
    cy.contains("Resetuj").click()
  })

  it("Should go back to login screen after clicking prijavu",()=>{
    cy.get("[href='/']").contains("prijavu").click()
    cy.url().should('be.equal', 'http://localhost:4200/')
    cy.contains("Prijavi se").should("be.visible")
  })
})