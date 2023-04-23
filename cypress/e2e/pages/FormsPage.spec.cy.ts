/// <reference types="cypress" />

describe('Forms page', () => {
  beforeEach(() => {
    cy.visit('/forms');
  });

  it('Contains inputs', () => {
    cy.contains(/Here you can add your contacts info/).should('have.length', 1);
    cy.get('#inputName').should('have.length', 1);
    cy.get('#inputPhone').should('have.length', 1);
    cy.contains('Male').should('have.length', 1);
    cy.get('.btn-submit').should('have.text', 'Submit');
  });
  it('Try to fill the form incorrectly...', () => {
    const phoneNumber = 'someText1';
    const invalidName = 'someText2';
    cy.get('#inputName').type(invalidName);
    cy.get('#inputPhone').type(phoneNumber);
    cy.contains('Male').find('input').click().should('be.checked');
    cy.get('.btn-submit').should('have.text', 'Submit').click();
    cy.contains('Аt least 2 words starting with a capital letter are expected');
    cy.contains('Must start with "+", contain only digits and be no shorter than 9 digits');
  });
  it('Try to fill the form correctly...', () => {
    const phoneNumber = '+375292221453';
    const validName = 'Some Name';
    cy.get('#inputName').type(validName);
    cy.get('#inputPhone').type(phoneNumber);
    cy.contains('Male').find('input').click().should('be.checked');
    cy.get('.btn-submit').should('have.text', 'Submit').click();
    cy.contains('The data has been saved!').should('have.length', 1);
    cy.contains(/Okay!/).click();
    cy.get('img').should(
      'have.attr',
      'src',
      'https://cdn-icons-png.flaticon.com/512/1077/1077114.png'
    );
    cy.contains(phoneNumber).should('be.visible');
    cy.contains(validName).should('be.visible');
  });
});
