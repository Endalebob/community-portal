/// <reference types="cypress" />

describe("Welcome Component", () => {
  beforeEach(() => {
    cy.visit("/"); // Assuming the Welcome component is rendered on the landing page
  });

  it("should display the main heading and description", () => {
    cy.contains("Welcome to the A2SV Community").should("be.visible");
    cy.contains(
      "We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need."
    ).should("be.visible");
    cy.contains(
      "We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick."
    ).should("be.visible");
  });

  it("should render two images", () => {
    cy.get(".h-96").should("have.length", 3);
  });

  it("should have correct alt text for each image", () => {
    cy.get('img[alt="welcome first image"]').should("have.length", 2);
  });
});
