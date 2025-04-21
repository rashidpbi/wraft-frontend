describe('template spec', () => {
  it('login', () => {
    cy.visit('http://localhost:3000');
    cy.get('input[name="email"]').type('rashidpbi111@gmail.com');
    cy.get('input[name="password"]').type('MyWraft@481');
    cy.get('button[type="submit"]').click();
    cy.contains('Expired Contracts');
  });
});
