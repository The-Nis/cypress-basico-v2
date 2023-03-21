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
        cy.get('#open-text-area').type(texto, { delay: 0 })
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    });

    // Aula 11
    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Denis')
        cy.get('#lastName').type('Fernando')
        cy.get('#email').type('denis@email,com')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    });

    //Aula 12
    it('Campo telefone continua vazio quando preenchido com valor não numerico', () => {
        cy.get('#phone').type('abcd').should('have.value', '')
    });

    //Aula 13
    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulario', () => {
        cy.get('#firstName').type('Denis')
        cy.get('#lastName').type('Fernando')
        cy.get('#email').type('denis@email.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    });
    
    //Aula 14
    it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
        .type('Denis')
        .should('have.value', 'Denis')
        .clear()
        .should('have.value', '')
        cy.get('#lastName')
        .type('Fernando')
        .should('have.value', 'Fernando')
        .clear()
        .should('have.value', '')
        cy.get('#email')
        .type('denis@email.com')
        .should('have.value', 'denis@email.com')
        .clear()
        .should('have.value', '')
        cy.get('#open-text-area')
        .type('Teste')
        .should('have.value', 'Teste')
        .clear()
        .should('have.value', '')

        cy.get('button[type="submit"]').click()
    });

    //Aula 15
    it.only('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('button[type="submit"]').click();

        cy.get('.error').should('be.visible');
    });
});

