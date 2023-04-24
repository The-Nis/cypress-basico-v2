// describe('Privacy Page', () => {
//     beforeEach(() => {
//         cy.visit('src/privacy.html')
//     });


//     it('testa a pagina privacidade de forma independente', () => {
//         cy.contains('Talking About Testing').should('be.visible');
//     });
// });

Cypress._.times(5, () => {
    it('testa a pagina privacidade de forma independente', () => {
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible');
    });
})