import Welcome from "<@>/components/home/Welcome";
import { mount } from "cypress/react18";
import React from "react";

describe("Welcome Component", () => {
  beforeEach(() => {
    mount(<Welcome />);
  });

  it("renders the title correctly", () => {
    cy.contains("Welcome to the A2SV Community").should("be.visible");
  });

  it("renders the paragraphs correctly", () => {
    cy.contains(
      "We are strategists, designers and developers. Innovators and problem solvers."
    ).should("be.visible");
    cy.contains(
      "Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need."
    ).should("be.visible");
    cy.contains(
      "We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick."
    ).should("be.visible");
  });

  it("renders both images", () => {
    cy.get('img[alt="welcome first image"]').should("have.length", 2);
  });

  it("displays images with the correct dimensions", () => {
    cy.get('img[alt="welcome first image"]').should(
      "have.attr",
      "width",
      "1000"
    );
    cy.get('img[alt="welcome first image"]').should(
      "have.attr",
      "height",
      "1000"
    );
  });
});
