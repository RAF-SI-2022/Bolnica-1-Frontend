/*
uloguje se kao mary.johnson
zapocne pregled i udje na uputi
napravi uput za kovid
napravi uput za stacionar - razlog kovid, odeljenje covid
vrati se nazad, popuni sva polja za kovid pregled brojevima
udje u karton i pogleda nerealizovane upute i pogleda kovid izvestaje

 */

describe("Doctor examining patient with covid", () => {
   beforeEach(() => {
      cy.login("mary.johnson", "password", "/doctor-workspace");
    });

  it("Should create referral for lab", () => {
    cy.contains("Pregled").last().click()
    cy.get("[data-cy='btnUput']").click()

    cy.get("[data-cy='covid-tab']").click();
    cy.get("[data-cy='AnalizeCovid']").select("PCR Covid");
    cy.get("[data-cy='btnDodajParametreCovid']").click();
    cy.get("[data-cy='cbParametarCovid']").click();
    cy.get("[data-cy='KomentarCovid']").type("Potrebna provera!", { force: true });
    cy.get("[data-cy='btnDodajCovid']").click();

    cy.on("window:confirm", (message) => {
      expect(message).to.equal("Da li ste sigurni da želite da napravite uput?");
    });

    cy.contains("Uspesno dodat uput!").should("be.visible");

    cy.get("[data-cy='infirmary-tab']").click();

    cy.get("[data-cy='diagnosis']").type("A15.3 - Tuberkuloza pluća, potvrđena neoznačenim metodama (Tuberculosis pulmonum, methodis non specificatis confirmata)",{force:true})
    cy.get("[data-cy='razlogStacionar']").select("Kovid")
    cy.get("[data-cy='OdeljenjeStacionar']").select("Covid").invoke("val").should("eq","Covid")
    cy.get("[data-cy='btnUstanove']").click()
    cy.get("[data-cy='cbHospitalStacionar']").click()
    cy.get("[data-cy='btnDodajStacionar']").click()
    cy.on('window:confirm', (message) => {
      expect(message).to.equal('Da li ste sigurni da želite da napravite uput?');
    });

    cy.contains("Uspesno dodat uput!").should("be.visible");

    cy.go('back')


  });


  it("Should finish the current appointment",()=>{
    cy.contains("Pregled").last().click()

    cy.get("[data-cy='Simptomi']").type("Nema culo mirisa i ukusa.",{force:true})
    cy.get("[data-cy='Trajanje']").type("5",{force:true})
    cy.get("[data-cy='Temperatura']").type("38",{force:true})
    cy.get("[data-cy='Pritisak']").type("120",{force:true})
    cy.get("[data-cy='Saturacija']").type("134",{force:true})
    cy.get("[data-cy='StanjePluca']").type("122",{force:true})
    cy.get("[data-cy='Terapija']").type("Brufen",{force:true})

    cy.get("[data-cy='btnZavrsi']").click()
    cy.contains("Uspesno sacuvano!").should("be.visible");

  })

});
