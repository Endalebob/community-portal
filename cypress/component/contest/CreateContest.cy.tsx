import React from "react";
import CreateContest from "../../../src/components/contest/CreateContest";
import { mount } from "cypress/react18";
import { Provider } from "react-redux";
import { store } from "<@>/store";
import MockRouter from "../../utils/router";

describe("<ContestForm />", () => {
  beforeEach(() => {
    // see: https://on.cypress.io/mounting-react
    cy.setCookie("role", "HeadOfEducation");
    mount(
      <Provider store={store}>
        <MockRouter asPath="/path/to/route#hash">
          <CreateContest />
        </MockRouter>
      </Provider>
    );
  });

  it("displays the form and handles form submission", () => {
    // Fill in form fields
    cy.get("form").submit();
    cy.contains("Title is required").should("be.visible");
    cy.get("#title").type("Sample Contest Title");
    cy.get("form").submit();
    cy.contains("Gym Id is required").should("be.visible");
    cy.get("#GymId").type("123");
    cy.get("form").submit();
    cy.contains("Description is required").should("be.visible");
    cy.get("#description").type("This is a sample contest description.");
    cy.get("form").submit();
    cy.contains("Date is required").should("be.visible");
    cy.get("#date").type("2023-08-15");
    cy.get("form").submit();
    cy.contains("Time is required").should("be.visible");
    cy.get("#time").type("14:00");
    cy.get("form").submit();
    cy.contains("Link is required").should("be.visible");
    cy.get("#link").type("https://www.example.com/sample-contest");

    cy.intercept(
      "POST",
      "https://a2sv-community-portal-api.onrender.com/api/Contests",
      { fixture: "contest/createContest.json" }
    ).as("createContest"); // Adjust the API route
    cy.get("form").submit();
    cy.wait("@createContest").then(({ request }) => {
      // Check the request payload
      expect(request.body).to.deep.equal({
        GymId: "123",
        title: "Sample Contest Title",
        description: "This is a sample contest description.",
        date: "2023-08-15T14:00:00Z",
        link: "https://www.example.com/sample-contest",
      });
      cy.get("#title").should("have.value", "Sample Contest Title");
      cy.get("#GymId").should("have.value", "123");
      cy.get("#description").should(
        "have.value",
        "This is a sample contest description."
      );
      cy.get("#date").should("have.value", "2023-08-15");
      cy.get("#time").should("have.value", "14:00");
      cy.get("#link").should(
        "have.value",
        "https://www.example.com/sample-contest"
      );
    });
  });
});
