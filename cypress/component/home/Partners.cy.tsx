import React from "react";
import Partners from "<@>/components/home/Partners";
import { mount } from "cypress/react18";

describe("Partners Component", () => {
  beforeEach(() => {
    mount(<Partners />);
  });

  it("renders the title correctly", () => {
    cy.contains("These and other companies partnered with us").should(
      "be.visible"
    );
  });

  it("renders all partner images", () => {
    const images = ["palantir", "meta", "google", "data-bricks", "instadeep"];

    images.forEach((name) => {
      cy.get(`img[alt="${name} partner image"]`).should("be.visible");
    });
  });

  it("displays the correct number of partner images", () => {
    cy.get("#partners").children().should("have.length", 5); // Assuming there are 5 partner images in the grid.
  });

  it("displays partner images with the correct dimensions", () => {
    const images = ["palantir", "meta", "google", "data-bricks", "instadeep"];

    images.forEach((name) => {
      cy.get(`img[alt="${name} partner image"]`).should(
        "have.attr",
        "width",
        "250"
      );
      cy.get(`img[alt="${name} partner image"]`).should(
        "have.attr",
        "height",
        "500"
      );
    });
  });
});
