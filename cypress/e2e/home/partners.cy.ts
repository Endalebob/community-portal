/// <reference types="cypress" />

describe("Partners Component", () => {
  beforeEach(() => {
    cy.visit("/"); // Assuming the Partners component is rendered on the landing page
  });

  it("should display the section title", () => {
    cy.contains("These and other companies partnered with us").should(
      "be.visible"
    );
  });

  it("should render all partner images", () => {
    cy.get("#partners") // Assuming the container of the partner images has the id 'partners'
      .children()
      .should("have.length", 5); // Assuming there are 5 partner images
  });

  it("should have correct alt text for each partner image", () => {
    const partners = ["palantir", "meta", "google", "data-bricks", "instadeep"];
    partners.forEach((partner) => {
      cy.get(`img[alt="${partner} partner image"]`).should("be.visible");
    });
  });
});
