/// <reference types="cypress" />

const baseUrl = 'http://localhost:3333/';

describe('check all routes are available:', () => {
  beforeEach(() => {
    cy.viewport(1600, 800);
  });
  it('known routes', () => {
    cy.log('at the Main page');

    cy.visit('/');
    cy.url().should('eq', baseUrl);
    cy.contains('Popular').should('have.length', 1);
    cy.contains(/about/).click();

    cy.log('at the About page');
    cy.url().should('eq', baseUrl + 'about');
    cy.contains(/about page/i)
      .should('have.length', 1)
      .should('be.visible');
    cy.contains(/forms/).click();

    cy.log('at the Forms page');
    cy.url().should('eq', baseUrl + 'forms');
    cy.contains('Here you can add your contacts info')
      .should('have.length', 1)
      .should('be.visible');
  });
  it('should render 404 page for unknown paths', () => {
    cy.visit('/myFaviritePath');
    cy.contains(/404 — page doesn't exist/i).should('be.visible');
    cy.contains(/Back to movies/i).click();
    cy.url().should('eq', baseUrl);
  });
});
