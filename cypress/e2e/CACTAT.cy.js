describe('CAC-TAT', () => {
    beforeEach(() => {
        cy.visit('src/index.html');
    });

    it('Verifica o título da aplicação', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });

    it('Preenche os campos obrigatórios e envia o formulario', () => {
        let texto = 'dhdjheghdjsa jdjdj kkwsdkwkd lkwdkwdw'

        cy.get('#firstName').type('Denis')
        cy.get('#lastName').type('Fernando')
        cy.get('#email').type('denis@email.com')
        cy.get('#open-text-area').type(texto)
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    });


});