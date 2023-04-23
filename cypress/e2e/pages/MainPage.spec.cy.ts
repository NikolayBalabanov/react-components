/// <reference types="cypress" />

function loadingElem(elem, print = true) {
  cy.get('body').then(($body) => {
    const el = $body.find(elem).length;
    if (el !== 0) {
      cy.wait(1);
      loadingElem(elem);
    } else {
      if (print) cy.log(`Открылась страница ${$body.find(elem).text()}`);
    }
  });
}

describe('Main page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display a loader', () => {
    cy.get('.animate-bounce').should('have.length', 1);
    loadingElem('animate-bounce');
  });

  it('should find content after the loader disappears and render clickable cards', () => {
    cy.get('.animate-bounce').should('have.length', 1);
    loadingElem('animate-bounce');
    cy.get('.movie-card').should('have.length', 20);
    cy.log('Movie cards are present!!!');
    cy.contains('Avatar: The Way of Water').click();
    cy.get('.modal').should('have.length', 1);
    cy.get('.modal__poster').should(
      'have.attr',
      'src',
      'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg'
    );
    cy.get('.trailer-link').should(
      'have.attr',
      'href',
      'https://www.youtube.com/watch?v=POfC3TrDO24'
    );

    cy.log('Ok. The modal is here, now try to close it...');
    cy.get('.close-btn').click();
    cy.wait(1);
    cy.get('body').then(($body) => {
      const el = $body.find('.modal').length;
      el === 0 && cy.log('Modal closed!');
    });
  });

  it("should have search input and it's works", () => {
    cy.get('input').type('bat');
    cy.get('form').find('.btn-submit').should('have.text', 'Submit').click();
    cy.contains(/The Batman/).should('be.visible');
    cy.get('input').should('have.value', 'bat');
    cy.log('Clear input');
    cy.get('.search__icon').click();
    cy.get('input').should('have.text', '');
    cy.contains('Avatar: The Way of Water');
  });

  it('should save search input value when routes change', () => {
    cy.get('input').type('bat');
    cy.get('form').find('.btn-submit').should('have.text', 'Submit').click();
    cy.contains(/The Batman/).should('be.visible');
    cy.get('input').should('have.value', 'bat');
    cy.contains(/about/).click();
    cy.url().should('eq', 'http://localhost:3333/about');
    cy.contains(/about page/i)
      .should('have.length', 1)
      .should('be.visible');
    cy.contains(/main/).click();
    cy.contains(/The Batman/).should('be.visible');
    cy.get('input').should('have.value', 'bat');
  });

  it('should display not found message if result is empty', () => {
    cy.get('input').type('batqweqw eqweqweqweqwe qwe qwe qwe qwe qwe');
    cy.get('form').find('.btn-submit').should('have.text', 'Submit').click();
    cy.contains(/Hmm... Result is empty. Try to serach something else!/).should('be.visible');
  });
});
