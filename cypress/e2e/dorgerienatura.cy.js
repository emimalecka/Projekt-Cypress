///<reference types="cypress" />
import DrogerieNaturaPage from '../support/drogerieNaturaPage';
import logIn from "../fixtures/loginDrogerieNatura.json";


const Natura = new DrogerieNaturaPage();

beforeEach("Setup", () => {
  cy.visit("/");
  cy.url().should("contain", "drogerienatura");
  cy.url().should("equal", "https://drogerienatura.pl/");
});

describe("Test check server response drogerie-natura", () => {
  it("TC_1 Check status code 200", () => {
    cy.request("https://drogerienatura.pl/").then(response => {
      expect(response.status).to.eq(200);
      if (response.status !== 200) {
        Cypress.runner.stop();
      }
    });
  });
});

describe("Test of banner", () => {
  it("TC_2 Close banner whit 'x'", () => {
    cy.ConfirmPopUp();
    Natura.getCloseBanner().should("be.visible");
    Natura.getCloseBanner().click();
    Natura.getCloseBanner().should("not.be.visible");
  })
});

describe("Test of banner  ", () => {
  it("TC_3 view more information on banner whit 'Sprawdź nasze propozycje'", () => {
    cy.ConfirmPopUp();
    cy.get('.bg-info').should("be.visible");
    cy.get(':nth-child(6) > p > a').click();
    cy.url().should('contain', 'https://drogerienatura.pl/')
  })
});


describe("Test of Cookie pop-up", () => {
  it("TC_4 Confirm pop-up", () => {
    Natura.getConfirmPopUp().should("be.visible");
    Natura.getConfirmPopUp().click();
    cy.wait(2000);
    Natura.getConfirmPopUp().should("not.exist");

  });
});


describe("Test of Cookie pop-up", () => {
  it("TC_5 Decline pop-up", () => {
    Natura.getDeclinePopUp().should("be.visible");
    Natura.getDeclinePopUp().click();
    cy.wait(2000);
    cy.get('.overflow-y-auto.items-start > .max-w-auto > .items-center').should("be.visible");
  })
})


describe("Searches, open and check products", () => {
  beforeEach("Close Pop up and fixtures", () => {
    cy.wait(2000)
    cy.ConfirmPopUp();
    cy.fixture("searchNatura").as("text");

  });

  it("TC_6 Search for 'szampon nivea'", function () {
    cy.get("#search").clear().type(this.text[0].mySearch).type("{enter}");
    cy.url().should("contain", this.text[0].query);
  });

  it("TC_7 Open category", () => {
    cy.get('[d="M0.5 12H24.5"]').click();
    cy.get('.transition-display > .max-w-full').should('be.visible');
  });

  it("TC_8 Open product 'Balsam nivea'", () => {
    cy.get('[href="/catalogsearch/result/?q=nivea"]').click();
    cy.get('img[alt="NIVEA NIVEA BALSAM REGENERACYJNY 400 ML"]').click();
    cy.get('#description > .w-full > .prose').should('be.visible');
  });

  it("TC_9 Check available promotions", () => {
    cy.get('.active > a > .pagebuilder-slide-wrapper').should('be.visible');
  });

});

describe("Login to Drogerie Natura", () => {
  it("TC_10 Login with incorrect password", () => {
    cy.ConfirmPopUp();
    cy.get('#customer-menu > .w-6').click();
    cy.get('.absolute > .btn-primary').click();
    cy.wait(3000);
    cy.ConfirmPopUp();
    cy.get('#customer-login-form > .fieldset').should("be.visible");
    cy.get('#email').type((logIn.login));
    cy.get('#pass').type(logIn.password);
    cy.get('.fieldset > .actions-toolbar > .btn > span').click();
    cy.get('.message > span').should("contain", "Twoje dane logowania są nieprawidłowe lub Twoje konto zostało tymczasowo zablokowane. Proszę chwilę zaczekać i spróbować ponownie.");
  });
});
