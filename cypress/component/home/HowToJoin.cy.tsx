import HowToJoin from "<@>/components/home/HowToJoin";
import { mount } from "cypress/react18";
import React from "react";
// cypress/howToJoin.spec.tsx
/// <reference types="cypress" />

describe("HowToJoin Component", () => {
  beforeEach(() => {
    mount(<HowToJoin />);
  });

  it("renders the title and description correctly", () => {
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

  it("displays the image for larger screens", () => {
    cy.viewport("macbook-15");
    cy.get('img[alt="how to join image"]').should("be.visible");
  });

  it("display the image for smaller screens", () => {
    cy.viewport("iphone-6");
    cy.get('img[alt="how to join image"]').should("exist");
  });
});
