import OverViewContests from "<@>/components/contest/OverViewContests";
import React from "react";
import MockRouter from "../../utils/router";
import { Provider } from "react-redux";
import { store } from "<@>/store";
import { mount } from "cypress/react18";
import IsOverviewLoading from "<@>/components/contest/IsOverviewLoading";

describe("overview contests component", () => {
  beforeEach(() => {
    cy.setCookie("role", "HeadOfEducation");
    mount(
      <Provider store={store}>
        <MockRouter asPath="/path/to/route#hash">
          <OverViewContests />
        </MockRouter>
      </Provider>
    );
  });

  it("displays contest status data correctly", () => {
    cy.intercept(
      "GET",
      "https://a2sv-community-portal-api.onrender.com/api/Contests/contest-stat",
      { fixture: "contest/contestStat" }
    ).as("contestStat");
    cy.wait("@contestStat");

    // Assert that the component displays the correct contest status data
    cy.contains("Total Contests Held").should("be.visible");
    cy.contains("5").should("be.visible");

    cy.contains("Upcoming Contest").should("be.visible");
    cy.contains("1").should("be.visible");

    cy.contains("Current Contest").should("be.visible");
    cy.contains("1").should("be.visible");
  });
});
