import React from "react";
import { mount } from "cypress/react";
import IsContestLoading from "<@>/components/contest/IsContestLoading";

describe("IsContestLoading Component", () => {
  it("renders loading animations", () => {
    mount(<IsContestLoading />);

    // Assert the presence of loading animations and skeleton elements
    cy.get(".animate-pulse.flex-row").should("exist");
    cy.get(".h-20.bg-slate-200.mt-8.w-64.rounded-xl").should("have.length", 2);
    cy.get(".h-8.bg-slate-200.rounded.mt-8").should("have.length", 6);
  });
});
