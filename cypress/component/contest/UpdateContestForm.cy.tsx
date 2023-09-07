import React from "react";
import { mount } from "cypress/react18";
import { Provider } from "react-redux";
import { store } from "<@>/store";
import MockRouter from "../../utils/router";
import EditContestForm from "<@>/components/contest/UpdateContest";

describe("EditContestForm Component", () => {
  beforeEach(() => {
    // Mock the router query parameter
    cy.intercept(
      "GET",
      "https://a2sv-community-portal-api.onrender.com/api/Contests/*",
      { fixture: "contest/singleContest.json" }
    ).as("getContest");
    cy.intercept(
      "PUT",
      "https://a2sv-community-portal-api.onrender.com/api/Contests",
      { fixture: "contest/updateContest.json" }
    ).as("updateContest");

    mount(
      <Provider store={store}>
        <MockRouter asPath="/path/to/route#hash">
          <EditContestForm />
        </MockRouter>
      </Provider>
    );
  });

  it("populate the form with initial values", () => {
    cy.wait("@getContest", { timeout: 1000 }).then(({ response }) => {
      cy.get("#title").should("have.value", "Contest Title");
      cy.get("#GymId").should("have.value", "");
      cy.get("#description").should("have.value", "Contest Description");
      cy.get("#date").should("have.value", "2023-08-10");
      cy.get("#time").should("have.value", "14:30");
      cy.get("#link").should("have.value", "https://example.com");

      // Check the request payload
      expect(response?.body.value).to.deep.equal({
        id: 1,
        title: "Contest Title",
        description: "Contest Description",
        date: "2023-08-10T14:30:00Z",
        link: "https://example.com",
      });
    });

    // Simulate user input
    cy.get("#title").clear().type("Updated Title");
    cy.get("#GymId").clear().type("456");
    cy.get("#description").clear().type("Updated Description");
    cy.get("#date").clear().type("2023-08-15");
    cy.get("#time").clear().type("16:45");
    cy.get("#link").clear().type("https://updated-example.com");

    // Check if the input values are updated
    cy.get("#title").should("have.value", "Updated Title");
    cy.get("#GymId").should("have.value", "456");
    cy.get("#description").should("have.value", "Updated Description");
    cy.get("#date").should("have.value", "2023-08-15");
    cy.get("#time").should("have.value", "16:45");
    cy.get("#link").should("have.value", "https://updated-example.com");
    cy.get("form").submit();

    // Check the request payload
    cy.wait("@updateContest").then(() => {
      cy.get("#title").should("have.value", "Updated Title");
      cy.get("#GymId").should("have.value", "456");
      cy.get("#description").should("have.value", "Updated Description");
      cy.get("#date").should("have.value", "2023-08-15");
      cy.get("#time").should("have.value", "16:45");
      cy.get("#link").should("have.value", "https://updated-example.com");
    });
  });
});
