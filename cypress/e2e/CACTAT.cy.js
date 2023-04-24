/// <reference types="Cypress" />




describe('CAC-TAT', () => {
    var three_seconds_in_ms = 3000

    beforeEach(() => {
        cy.visit('src/index.html');
    });

    it('Verifica o título da aplicação', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });

    it('Preenche os campos obrigatórios e envia o formulario', () => {
        let texto = 'dhdjheghdjsa jdjdj kkwsdkwkd lkwdkwdw'

        cy.clock()

        cy.get('#firstName').type('Denis')
        cy.get('#lastName').type('Fernando')
        cy.get('#email').type('denis@email.com')
        cy.get('#open-text-area').type(texto, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(three_seconds_in_ms)
        cy.get('.success').should('not.be.visible')
    });

    // Aula 11
    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.clock()
        cy.get('#firstName').type('Denis')
        cy.get('#lastName').type('Fernando')
        cy.get('#email').type('denis@email,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(three_seconds_in_ms)
        cy.get('.success').should('not.be.visible')

    });

    //Aula 12
    it('Campo telefone continua vazio quando preenchido com valor não numerico', () => {
        cy.get('#phone').type('abcd').should('have.value', '')
    });

    //Aula 13
    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulario', () => {
        cy.clock()
        cy.get('#firstName').type('Denis')
        cy.get('#lastName').type('Fernando')
        cy.get('#email').type('denis@email.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
        cy.tick(three_seconds_in_ms)
        cy.get('.error').should('not.be.visible')
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
        cy.clock()
        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible');
        cy.tick(three_seconds_in_ms)
        cy.get('.error').should('not.be.visible')
    });

    //Aula 16
    it('Envia o formulario com sucesso usando um comando customizado', () => {
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()
        cy.tick(three_seconds_in_ms)
        cy.get('.success').should('not.be.visible')
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

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(($input) => {
            expect($input[0].files[0].name).to.equal('example.json')
        })

    });

    // Aula 30 Drag and drop

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
        .should(($input) => {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    });

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]').selectFile('@sampleFile')
        .should(($input) => {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    });

    // 32 - Links que direcionam para outra aba

    it('verifica que a politica de privacidade abre em outra aba sem a necessidade de um click', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank');
    });

    it('acessa a pagina da polictica de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible');
    });
 
    // aula 45 & 46 - cy.clock() e cy.tick()

    it('Exibe mensagem por 3 segundos', () => {

        

        cy.clock()

        let texto = 'dhdjheghdjsa jdjdj kkwsdkwkd lkwdkwdw'

        cy.get('#firstName').type('Denis')
        cy.get('#lastName').type('Fernando')
        cy.get('#email').type('denis@email.com')
        cy.get('#open-text-area').type(texto, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')

        cy.tick(three_seconds_in_ms)

        cy.get('.success').should('not.be.visible')
    });


    // Aula 47 e 48 - lodash
    // lodash é uma biblioteca com diversas funções
    // 1 - Cypress._.times() - executa uma função de callback um certo numero de vezes onde o numero de vezes é o primeiro argumento e a função callback é o segundo
    // 2 - Cypress._.repeat() - repete uma string um certo numero de vezes onde o primeiro argumento é a string a qual deseja-se repetir e o segundo argumento quantas vez tal string deve ser repetida

    Cypress._.times(5, () => {
        it('Preenche os campos obrigatórios e envia o formulario', () => {
            let texto = 'dhdjheghdjsa jdjdj kkwsdkwkd lkwdkwdw'
    
            cy.clock()
    
            cy.get('#firstName').type('Denis')
            cy.get('#lastName').type('Fernando')
            cy.get('#email').type('denis@email.com')
            cy.get('#open-text-area').type(texto, { delay: 0 })
            cy.contains('button', 'Enviar').click()
            cy.get('.success').should('be.visible')
            cy.tick(three_seconds_in_ms)
            cy.get('.success').should('not.be.visible')
        });
    })

    // Aula 49 e 50 - invoke(show) e invoke(hide)
    
    it.only('Exibe e esconde as mensagens de suscesso e erro usando o .invoke', () => {
        cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
        cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
        ;
    });


});

