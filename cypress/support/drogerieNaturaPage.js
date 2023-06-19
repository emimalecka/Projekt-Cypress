class DrogerieNaturaPage {

    getConfirmPopUp() {
        return cy.get('.amgdprcookie-button[aria-label="Zaakceptuj wszystkie"]');
    }
    getCloseBanner() {
        return cy.get(".w-3");
    }
    getDeclinePopUp() {
        return cy.get('button.amgdprcookie-button[aria-label="Zarządzaj cookies"]');
    }

}

export default DrogerieNaturaPage;
