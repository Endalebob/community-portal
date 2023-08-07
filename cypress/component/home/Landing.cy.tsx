// cypress/landing.spec.tsx
/// <reference types="cypress" />

import React from "react";
import Landing from "<@>/components/home/Landing";
import { mount } from "cypress/react18";
// Replace '../../src/Landing' with the correct path to your Landing component.

describe("Landing Component", () => {
  beforeEach(() => {
    mount(<Landing />);
  });

  it("renders the logo", () => {
    cy.get('img[alt="logo"]').should("be.visible");
  });

  it('renders the "Sign In" button', () => {
    cy.contains("Sign In").should("be.visible");
  });

  it('should display the main heading and "Get Started" and "Learn More" buttons', () => {
    cy.contains("Ignite Africa's Digital Future").should("be.visible");
    cy.contains("Join us today").should("be.visible");
    cy.contains("Get Started").should("be.visible");
    cy.contains("Learn More").should("be.visible");
  });

  it('navigates to "#more" when "Learn More" button is clicked', () => {
    cy.contains("Learn More").click();
    cy.url().should("include", "#more");
  });
});
