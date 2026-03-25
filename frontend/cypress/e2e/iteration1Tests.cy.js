describe("Iteration 1: Public UI Acceptance Tests", () => {
  const testbedUrl = "https://property-management-system-zp56.onrender.com";

  it("Story 1: Should display landing page information", () => {
    // given the user enters the website url
    cy.visit(testbedUrl);

    // when the homepage loads. Then the website name and logo should be clearly displayed
    cy.get("nav").should("be.visible");
    cy.contains("All-in-One Property Management Platform").should("be.visible");
    cy.contains("Get Started");
    cy.contains("Onboarding");
    cy.contains("Features");
    cy.get("img").should("be.visible");
  });

  it("User Story 2: Go to contact page", () => {
    cy.visit(testbedUrl);

    // user clicks button to go to contact support page
    cy.contains("Technical Support").click();

    cy.url().should("include", "/contact");

    // on the page user should see all relevant information
    cy.contains("Contact Us");
    cy.contains("@").should("be.visible");
    cy.contains('555').should("exist"); 
  });

  it("User Story 3: Landlord can navigate to Property and Messaging Dashboards", () => {
    cy.visit(`${testbedUrl}/`);
    cy.contains("Sign In").click();

    cy.origin("dev-slrvjnppgr7wirsz.us.auth0.com", () => {
      cy.get('input[name="username"]').type("ifeanyi@email.com");
      cy.get('input[name="password"]').type("yZ5fwTxqQ38jV2");
      cy.contains("Continue").click();
    });


    // property dashboard routing test
    cy.contains("My Dashboard").click();
    cy.url().should("include", "/landlord");
    cy.contains("My Properties").should("be.visible");

    // messaging dashboard routing test
    cy.contains("Messages").click();
    cy.url().should("include", "/messages");
    cy.get('input[placeholder="Search..."]').should("be.visible");
  });

  it('Story 4: Landlord can Add, View, and Delete a property', () => {
    cy.visit(`${testbedUrl}/landlord`);

    // add property 
    cy.contains('Add Property').click();
    cy.get('input[name="name"]').type('Cypres Test Property');
    cy.get('input[name="units"]').type('10');
    cy.get('input[name=location"]').type('123 Test Ave, Toronto, ON');
    cy.contains('button', "Add Property").click(); // skipping uploading photo

    // view properties 
    cy.contains('Cypress Test Property').should('be.visible');
    cy.contains('123 Test Ave, Toronto, ON').should('be.visible');

    // Delete Proeprty
    cy.contains('.card', 'Cypress Test Property')
    .find('.bi-trash')
    .click();

    cy.contains('Cypress Test Property').should('not.exist');
  });

  it('Story 5: Residents can navigate dashboard pages', () => {
    cy.visit(testbedUrl);

      // sign in again for resident 
      cy.contains("Sign In").click();
      cy.origin("dev-slrvjnppgr7wirsz.us.auth0.com", () => {
      cy.get('input[name="username"]').type("testResident@email.com");
      cy.get('input[name="password"]').type("testPassword1*");
      cy.contains("Continue").click();  

    cy.contains('Submit Maintenance Requests').click();
    cy.url('include', '/submit-maintenance');

    cy.contains('My Profile').click();
    cy.url().should('include', '/profile');

    cy.contains('Messages').click();
    cy.url().should('include', '/messages');

    cy.contains('Property Details').click();
    cy.url().should('include', '/details');
  })
});
