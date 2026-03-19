describe('Iteration 1: Public UI Acceptance Tests', () => {
    const testbedUrl = 'https://property-management-system-zp56.onrender.com';
  
    it('Story 1: Should display landing page information', () => {
      // given the user enters the website url 
      cy.visit(testbedUrl);

      // when the homepage loads. Then the website name and logo should be clearly displayed
      cy.contains('Propery Management');
      cy.get('img').should('be.visible');
    });

    it('Story 2: Should navigate to and display Contact Support', () => {
      // given user is on the website 
      cy.visit(testbedUrl);

      // when user navigates to contact support section 
      cy.contain('Contact Support').click();

      // Then the customer service email and phone number are displayed
      cy.contains('support@');
      cy.contains('555-');
  })
})
