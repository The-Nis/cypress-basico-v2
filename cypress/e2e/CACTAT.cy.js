




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
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    });

    // Aula 11
    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Denis')
        cy.get('#lastName').type('Fernando')
        cy.get('#email').type('denis@email,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
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
        cy.contains('button', 'Enviar').click()

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

        cy.contains('button', 'Enviar').click()
    });

    //Aula 15
    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible');
    });

    //Aula 16
    it('Envia o formulario com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
    });

    // Aula 17

    it('Testar o contains', () => {
        let texto = 'dhdjheghdjsa jdjdj kkwsdkwkd lkwdkwdw'

        cy.get('#firstName').type('Denis')
        cy.get('#lastName').type('Fernando')
        cy.get('#email').type('denis@email.com')
        cy.get('#open-text-area').type(texto, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    });

    //select

    // .select('YouTube') - a seleção pode ser feita pelo texto
    // .select('youtube') - pode ser feita pelo value
    // .select(2)ou pelo indicie
    // se for mais uma opção pode ser selecionado utilizando um array

    it('Seleciona um produto (YouTube) por seu texto', () => {
        cy.get('select').select('YouTube').should('have.value', 'youtube');
    });

    it('Seleciona um produto (Mentoria) por seu valor', () => {
        cy.get('select').select('mentoria').should('have.value', 'mentoria');
    });

    it('Seleciona um produto (Blog) por seu indice', () => {
        cy.get('select').select(1).should('have.value', 'blog');
    });

    // RADIOS
    it('Marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback');
    });

    it('Marca cada tipo de atendimento', () => {

        cy.get('input[type="radio"][value="ajuda"]')
        .check()
        .should('be.checked')
        .should('have.value', 'ajuda');
        cy.get('input[type="radio"][value="elogio"]')
        .check()
        .should('be.checked')
        .should('have.value', 'elogio');
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('be.checked')
        .should('have.value', 'feedback');
        
    });

    it('Marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(($radio) => {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    });
    // Estudar o .each e cy.wrap() aula 24

    it('marcar ambos checkboxes, depois desmarcar o último', () => {
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName')
        .type('Denis')
        cy.get('#lastName')
        .type('Fernando')
        cy.get('#email')
        .type('denis@mail.com')
        cy.get('#phone-checkbox')
        .check()
        cy.get('button[type="submit"]')
        .click()
        cy.get('.error')
        .should('be.visible')
    });

    // AULA 28 fazer upload de arquivos

    it.only('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(($input) => {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    });

    // aula 30

});

