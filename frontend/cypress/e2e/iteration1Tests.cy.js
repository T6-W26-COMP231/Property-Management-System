describe('Iteration 1: Public UI Acceptance Tests', () => {
    const testbedUrl = 'https://property-management-system-zp56.onrender.com';
  
    it('Story 1: Should display landing page information', () => {
      // given the user enters the website url 
      cy.visit(testbedUrl);

      // when the homepage loads. Then the website name and logo should be clearly displayed
      cy.get('h1').contains('Property Management System');
      cy.get('h2').contains('Our Mission');
      cy.contains('Features')
      cy.get('img').should('be.visible');
    });

    it('User Story 2: Go to contact page', () => {
      cy.visit(testbedUrl);

      // user clicks button to go to contact support page 
      cy.contains('Contact Support').click();

      // on the page user should see all relevant information
      cy.contains('Contact Us');
      cy.get('p')
      cy.contains('support@')
      cy.contains('555')
      cy.contains('Address')
      cy.contains('Business Hours')
    })
})
