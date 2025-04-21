/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
Cypress.Commands.add('login', (username, password) => {
  cy.visit('http://localhost:3000');
  cy.get('input[name="email"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('createLayout', () => {
  cy.get('[data-id="sidebar-item"]').contains('Manage').click();
  cy.get('[data-id="item-layout"]').contains('Layout').click();
  cy.get('[data-id="add-layout-button"]').contains('Layout').click();
  cy.get('[data-id="input-layout-name"]').type('mortgage layout');
  cy.get('[data-id="slug-layout-items-field"]')
    .click()
    .contains('Contract')
    .click();
  cy.get('[data-id="input-layout-description"]').type(
    'description for mortgage layout',
  );
  cy.get('[data-id="layout-next-button"]').click();
  cy.get('[data-id="upload-file"]').selectFile(
    'cypress/fixtures/Letterhead_Template.pdf',
    { action: 'drag-drop', force: true },
  );
  cy.wait(3000);
  cy.get('[data-id="create-layout-submit"]').click();
});
