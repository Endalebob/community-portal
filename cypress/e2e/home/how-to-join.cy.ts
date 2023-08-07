/// <reference types="cypress" />

describe("HowToJoin Component", () => {
  beforeEach(() => {
    cy.visit("/"); // Assuming the HowToJoin component is rendered on the landing page
  });

  it("should display the main heading and description", () => {
    cy.contains("How do I join A2SV?").should("be.visible");
    cy.contains(
      "The way to join A2SV is through A2SV Community Portal. The community path is open to everyone who has interest in problem solving and in Data Structures and Algorithms."
    ).should("be.visible");
  });

  it("should render all steps with icons, titles, and descriptions", () => {
    cy.contains("Sign Up");
    cy.contains(
      "Sign up to access contests and be eligible for applying to A2SV"
    );
    cy.contains("Take Contests");
    cy.contains("Access contests and take at least 2 contests consecutively");
    cy.contains("Apply");
    cy.contains("Complete your profile and apply to join A2SV");
  });

  it('should display the "how to join image"', () => {
    cy.get('img[alt="how to join image"]').should("be.visible");
  });
});
