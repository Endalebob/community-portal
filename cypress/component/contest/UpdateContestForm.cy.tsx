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
      { fixture: "contest/singleContest.json" } // Replace with your fixture containing a single contest
    ).as("getContest");

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
      //   cy.get("#title").should("have.value", "Contest Title");
      //   cy.get("#GymId").should("have.value", "0");
      //   cy.get("#description").should("have.value", "Contest Description");
      //   cy.get("#date").should("have.value", "2023-08-10");
      //   cy.get("#time").should("have.value", "14:30");
      //   cy.get("#link").should("have.value", "https://example.com");
      // });

      expect(response?.body.value).to.deep.equal({
        id: 1,
        title: "Contest Title",
        description: "Contest Description",
        date: "2023-08-10T14:30:00Z",
        link: "https://example.com",
      });
    });

    // it("updates the form values on input change", () => {
    //   // Mount the component
    //   mount(
    //     <Provider store={store}>
    //       <MockRouter asPath="/path/to/route#hash">
    //         <EditContestForm />
    //       </MockRouter>
    //     </Provider>
    //   );

    //   // Simulate user input
    //   cy.get("#title").type("Updated Title");
    //   cy.get("#GymId").type("456");
    //   cy.get("#description").type("Updated Description");
    //   cy.get("#date").type("2023-08-15");
    //   cy.get("#time").type("16:45");
    //   cy.get("#link").type("https://updated-example.com");

    //   // Check if the input values are updated
    //   cy.get("#title").should("have.value", "Updated Title");
    //   cy.get("#GymId").should("have.value", "456");
    //   cy.get("#description").should("have.value", "Updated Description");
    //   cy.get("#date").should("have.value", "2023-08-15");
    //   cy.get("#time").should("have.value", "16:45");
    //   cy.get("#link").should("have.value", "https://updated-example.com");
    // });

    // it("displays validation errors on form submission with missing fields", () => {
    //   // Mount the component
    //   mount(
    //     <Provider store={store}>
    //       <MockRouter asPath="/path/to/route#hash">
    //         <EditContestForm />
    //       </MockRouter>
    //     </Provider>
    //   );

    //   // Submit the form
    //   cy.get("form").submit();

    //   // Check if validation errors are displayed
    //   cy.contains("Title is required").should("be.visible");
    //   cy.contains("Gym Id is required").should("be.visible");
    //   cy.contains("Description is required").should("be.visible");
    //   cy.contains("Date is required").should("be.visible");
    //   cy.contains("Time is required").should("be.visible");
    //   cy.contains("Link is required").should("be.visible");
  });

  // Add more tests as needed
});
