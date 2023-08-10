import React from "react";
import ContestList from "<@>/components/contest/ContestList";
import { mount } from "cypress/react18";
import { Provider } from "react-redux";
import { store } from "<@>/store";
import MockRouter from "../../utils/router";

describe("ContestList Component", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://a2sv-community-portal-api.onrender.com/api/Contests",
      { fixture: "contest/contests.json" }
    ).as("getContests");
    cy.intercept(
      "POST",
      "https://a2sv-community-portal-api.onrender.com/api/Contests/*",
      {
        fixture: "contest/deleteContest.json",
      }
    ).as("deleteContest");
    cy.setCookie("role", "HeadOfEducation");
    mount(
      // Wrap the component with the Provider and provide the Redux store
      <Provider store={store}>
        <MockRouter asPath="/path/to/route#hash">
          <ContestList />
        </MockRouter>
      </Provider>
    );
    // cy.wait("@getContests");
  });

  it("displays contest details correctly", () => {
    cy.contains("Title").should("be.visible");
    cy.contains("Date").should("be.visible");
    cy.contains("Time").should("be.visible");
    cy.contains("Codeforces").should("be.visible");
  });

  it('displays the "New Contest" button for HeadOfEducation', () => {
    cy.get("button").contains("+ New Contest").should("be.visible");
  });

  // it('navigates to the "Create Contest" page when "New Contest" button is clicked', () => {
  //   cy.contains("+ New Contest").click();
  //   cy.url().should("include", "/admin/contests/create-contest");
  // });

  it("displays contests fetched from the API", () => {
    cy.get(".border-b").should("have.length", 3);
  });

  it('opens the confirmation modal when "Remove" button is clicked', () => {
    cy.contains("Remove").first().click();
    cy.contains("Are you sure?").should("be.visible");
    cy.contains("you want to delete this contest").should("be.visible");
  });

  it('deletes the contest when "Yes" is clicked in the confirmation modal', () => {
    cy.contains("Remove").first().click();
    cy.contains("Yes").click();
    // cy.wait("@deleteContest");
    cy.contains("Are you sure?").should("not.exist");
  });

  it('cancels the deletion when "No" is clicked in the confirmation modal', () => {
    cy.contains("Remove").first().click();
    cy.contains("No").click();
    cy.contains("Are you sure?").should("not.exist");
  });

  // it("handles loading state correctly", () => {
  //   cy.intercept(
  //     "GET",
  //     "https://a2sv-community-portal-api.onrender.com/api/Contests",
  //     { delay: 500 }
  //   ).as("getContests");
  //   cy.contains("Loading...").should("be.visible");
  //   // cy.wait("@getContests");
  //   cy.contains("Loading...").should("not.exist");
  // });

  // it("handles error state correctly", () => {
  // cy.intercept("GET", "https://a2sv-community-portal-api.onrender.com/api/Contests", { statusCode: 500 }).as(
  //   "getContests"
  // );
  //   cy.contains("Error occurred while fetching contests.").should("be.visible");
  // });
});

describe("No contests add yet", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://a2sv-community-portal-api.onrender.com/api/Contests",
      { fixture: "contest/noContests.json" }
    ).as("noContests");

    // cy.setCookie("role", "HeadOfEducation");
    mount(
      // Wrap the component with the Provider and provide the Redux store
      <Provider store={store}>
        <MockRouter asPath="/path/to/route#hash">
          <ContestList />
        </MockRouter>
      </Provider>
    );
  });

  it('displays "No contests added yet" message when there are no contests', () => {
    cy.contains("No contests added yet. Check back soon for updates!").should(
      "be.visible"
    );
  });
});

// describe("handles error state correctly", () => {
//   beforeEach(() => {
//     cy.intercept(
//       "GET",
//       "https://a2sv-community-portal-api.onrender.com/api/Contests",
//       { statusCode: 500 }
//     ).as("errorContests");
//     mount(
//       // Wrap the component with the Provider and provide the Redux store
//       <Provider store={store}>
//         <MockRouter asPath="/path/to/route#hash">
//           <ContestList />
//         </MockRouter>
//       </Provider>
//     );
//   });
//   it("", () => {
//     cy.contains("Error occurred while fetching contests.").should("be.visible");
//   });
// });
