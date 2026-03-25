describe('Iteration 1: Public UI Acceptance Tests', () => {
    const testbedUrl = 'https://property-management-system-zp56.onrender.com';
  
    it('Story 1: Should display landing page information', () => {
      // given the user enters the website url 
      cy.visit(testbedUrl);

      // when the homepage loads. Then the website name and logo should be clearly displayed
      cy.get('h1').contains('All-in-One Property Management Platform')
      cy.contains('Get Started')
      cy.contains('Onboarding')
      cy.contains('Features')
      cy.get('img').should('be.visible');
    });

    it('User Story 2: Go to contact page', () => {
      cy.visit(testbedUrl);

      // user clicks button to go to contact support page 
      cy.contains('Technical Support').click();

      // on the page user should see all relevant information
      cy.contains('Contact Us');
      cy.get('p')
      cy.contains('support@')
      cy.contains('555')
      cy.contains('Address')
      cy.contains('Business Hours')
    });

    it('User Story 3: Landlord can navigate to Property and Messaging Dashboards', () => {
      cy.visit(`${testbedUrl}/`);

      cy.contains('Sign In').click();

      cy.origin('dev-slrvjnppgr7wirsz.us.auth0.com', () => {
        cy.get('input[name="email.com]').type('ifeanyi@email.com');
        cy.get('input[name="password"]').type('password');
        cy.contains('Continue').click();
      })
      
      // property dashboard routing test
      cy.contains('My Dashboard').click();
      cy.url().should('include', '/landlord');
      cy.contains('My Properties').should('be visible')

      // messaging dashboard routing test
      cy.contains('Messages').click();
      cy.url().should('include', '/messages');
      cy.get('input[placeholder="Search..."]').should('be.visible');

    })
})
