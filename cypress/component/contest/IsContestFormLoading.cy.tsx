import React from "react";
import { mount } from "cypress/react";
import IsContestFormLoading from "<@>/components/contest/IsContestFormLoading";

describe("IsContestFormLoading Component", () => {
  it("renders loading animation", () => {
    mount(<IsContestFormLoading />);

    // Assert that loading animation elements are present
    cy.get(".animate-pulse").should("exist");
    cy.get(".h-6.bg-slate-100.rounded").should("have.length", 4);
    cy.get(".h-16.bg-slate-100.rounded").should("exist");
    cy.get(".h-6.bg-slate-100.rounded.mt-8.col-span-1").should(
      "have.length",
      2
    );
  });
});
