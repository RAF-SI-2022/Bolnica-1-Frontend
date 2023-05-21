/// <reference types="cypress" />

describe("Doctor Search Patient", ()=>{
    beforeEach(()=>{
        cy.login("jane.smith","password","/doctor-workspace")
        cy.visit("/doctor-workspace")
    })    

    it("Should change blood type and add new alergies and vaccine",()=>{
        cy.contains("Pregled").last().click()
        cy.get("[data-cy='btnKarton']").click()
        cy.get("[data-cy='btnIzmeni']").click()
        cy.get("[data-cy='KrvnaGrupa']").select("AB").invoke("val").should("eq","AB")
        cy.get("[data-cy='RhFaktor']").select("-").invoke("val").should("eq","-")
        cy.get("[data-cy='btnSacuvaj']").click()
        cy.get("[data-cy='IzaberiAlergen']").select("Riba").invoke("val").should("eq","Riba")
        cy.get("[data-cy='dodajAlergiju']").click()
        cy.get("[data-cy='IzaberiAlergen']").select("Tetraciklin").invoke("val").should("eq","Tetraciklin")
        cy.get("[data-cy='dodajAlergiju']").click()
        cy.get("[data-cy='IzaberiVakcinu']").select("INFLUVAC").invoke("val").should("eq","INFLUVAC")
        cy.get("[data-cy='dateDatumPrimanja']").type("2023-05-05")
        cy.get("[data-cy='brnDodajVakcinu']").click()
        cy.go('back')
        cy.contains("Riba").should("be.visible")
    })

    it("Should schedule an appointment at the cardiologist",()=>{
        cy.contains("Pregled").last().click()
        cy.get("[data-cy='btnUput']").click()
        cy.get("[data-cy='Analize']").select("Urea")
        cy.get("[data-cy='btnDodajParametre']").click()
        cy.get("[data-cy='cbParametar']").click()
        cy.get("[data-cy='Komentar']").type("Potrebna provera!",{force:true})
        cy.get("[data-cy='Odeljenje']").select("Cardiology").invoke("val").should("eq","Cardiology")
        cy.get("[data-cy='btnUstanove']").click()
        cy.get("[data-cy='cbHospital']").click()
        cy.get("[data-cy='btnDodaj']").click()
        cy.on('window:confirm', (message) => {
            expect(message).to.equal('Da li ste sigurni da želite da napravite uput?');
          });
        cy.go('back')
    })

    it("Should finish the current appointment",()=>{
        cy.contains("Pregled").last().click()
        cy.get("[data-cy='Tegobe']").type("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ligula diam, congue vitae tempor sed, congue et felis.",{force:true})
        cy.get("[data-cy='Bolest']").type("Vestibulum convallis efficitur accumsan.",{force:true})
        cy.get("[data-cy='LicnaAnamneza']").type("Donec mollis felis vitae mi fringilla, vel tincidunt nibh maximus. Fusce quis commodo sem.",{force:true})
        cy.get("[data-cy='PorodicnaAnamneza']").type("Curabitur id velit egestas, mollis dolor in, laoreet quam.",{force:true})
        cy.get("[data-cy='MisljenjePacijenta']").type("Suspendisse dignissim mi et ex accumsan, quis vestibulum ex pretium.",{force:true})
        cy.get("[data-cy='ObjektivniNalaz']").type("Phasellus congue, quam a porta venenatis, velit odio pharetra ipsum, ut porta sapien turpis id leo. Sed porttitor sem sit amet ligula faucibus, eget malesuada sapien convallis.",{force:true})
        cy.get("[data-cy='btnDijagnoza']").click()
        cy.get("[data-cy='Sifra']").scrollIntoView().select("D50").invoke("val").should("eq","D50")
        cy.get("[data-cy='Rezultat']").select("OPORAVLJEN").invoke("val").should("eq","OPORAVLJEN")
        cy.get("[data-cy='OpisStanja']").type("Vestibulum dapibus mauris vitae elit pulvinar, vel commodo tortor finibus.",{force:true})
        cy.get("[data-cy='cbDijagnoza']").click({force:true})
        cy.get("[data-cy='PredlaganjeTerapije']").type("Cras dapibus, mauris vel efficitur scelerisque, metus nunc facilisis justo, non finibus ex augue id erat.",{force:true})
        cy.get("[data-cy='Savet']").type("Aenean malesuada nulla quis auctor gravida. Maecenas bibendum nisl mauris, id hendrerit lacus cursus vitae.",{force:true})
        cy.get("[data-cy='btnSacuvaj']").click({force:true})
        cy.get("[data-cy='btnOk']").click({force:true})
        cy.visit("/doctor-workspace")
    })
})

// describe("Doctor Search Patient", ()=>{
//     beforeEach(()=>{
//         cy.login("jane.smith","password","/doctor-workspace")
//         cy.visit("/doctor-search-patients")
//     })    

//     it("Should search for a patient",()=>{
//         cy.get("[data-cy='ime']").clear().type("Marko",{force:true})
//         cy.get("[data-cy='pretrazi']").contains("Pretrazi").click()
//     })

// })