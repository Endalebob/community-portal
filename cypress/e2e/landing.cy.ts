/// <reference types="cypress" />

describe("Landing Component", () => {
  beforeEach(() => {
    cy.visit("/"); // Assuming the component is rendered on the landing page
  });

  it('should display the "Who We Are" section with the correct content', () => {
    cy.contains("Who We Are");
    cy.contains("A2SV upskills high-potential university students");
    cy.contains(
      "The program is free for students, making the opportunity available for youth who have talent but lack the means to use it."
    );
  });

  it('should navigate to the signup page when "Join Us" button is clicked', () => {
    cy.contains("Join Us").click();
    cy.url().should("include", "/auth/signup"); // Assuming the signup page URL contains '/auth/signup'
  });

  it('should navigate to the section with more information when "More Information" button is clicked', () => {
    cy.get('button:contains("More Information")').click();
    // Assuming you have a specific section with an id of 'more'
    cy.get("#more").should("exist");
  });

  it('should not display the "Join Us" button if user is authenticated', () => {
    // Mock the authenticated state
    cy.intercept("GET", "/api/auth", { isAuthenticated: true });

    cy.reload(); // Assuming the component needs to be re-rendered after mocking the state

    cy.contains("Join Us").should("not.exist");
  });
});
