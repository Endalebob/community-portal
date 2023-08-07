/// <reference types="cypress" />

describe("Landing Page", () => {
  beforeEach(() => {
    cy.visit("/"); // Assuming the landing page is served on the root URL
  });

  it('should display the logo and "Sign In" button', () => {
    cy.get('img[alt="logo"]').should("be.visible");
    cy.contains("Sign In").should("be.visible");
  });

  it('should display the main heading and "Get Started" and "Learn More" buttons', () => {
    cy.contains("Ignite Africa's Digital Future").should("be.visible");
    cy.contains("Join us today").should("be.visible");
    cy.contains("Get Started").should("be.visible");
    cy.contains("Learn More").should("be.visible");
  });

  it('should navigate to the sign-in page when "Sign In" button is clicked', () => {
    cy.contains("Sign In").click();
    cy.url().should("include", "/auth/signin"); // Assuming the sign-in page URL contains '/auth/signin'
  });

  it('should navigate to the sign-up page when "Get Started" button is clicked', () => {
    cy.contains("Get Started").click();
    cy.url().should("include", "/auth/signin"); // Assuming the sign-up page URL contains '/auth/signup'
  });

  it('should navigate to the "Learn More" section when "Learn More" button is clicked', () => {
    cy.contains("Learn More").click();
    // Assuming you have a specific section with an id of 'learn-more'
    cy.get("#more").should("exist");
  });
});
