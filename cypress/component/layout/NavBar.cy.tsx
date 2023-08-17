import NavBar from "<@>/components/layout/NavBar";
import { store } from "<@>/store";
import { mount } from "cypress/react18";
import { Provider } from "react-redux";
import MockRouter from "../../utils/router";

describe("NavBar", () => {

  beforeEach(() => {

    mount(
      <Provider store={store}>
      <MockRouter>
        <NavBar />
      </MockRouter>
      </Provider>
    );

  });

  it("should display the logo", () => {
    cy.get("img[alt='logo']").should("be.visible");
  });

  it("should navigate to different pages when links are clicked", () => {
    cy.get("nav a").first().click();
    cy.url().should("include", "/journey");

    cy.get("nav a").eq(1).click();
    cy.url().should("include", "/resources");

    cy.get("nav a").eq(2).click();
    cy.url().should("include", "/announcements");
  });

  it("should show and hide the navigation menu on mobile", () => {
    cy.viewport("iphone-6"); // Adjust the viewport accordingly

    cy.get(".md:hidden").click();
    cy.get("nav").should("be.visible");

    cy.get(".md:hidden").click();
    cy.get("nav").should("not.be.visible");
  });

  it("should show the user profile dropdown when clicked", () => {
    cy.get("button.shadow.rounded-full").click();
    cy.get(".bg-primarybg").should("be.visible");

    cy.get("button.shadow.rounded-full").click();
    cy.get(".bg-primarybg").should("not.be.visible");
  });

  it("should logout when 'Sign Out' is clicked", () => {
    cy.get("button.shadow.rounded-full").click();
    cy.contains("Sign Out").click();

    cy.url().should("include", "/auth/signin");
  });

  it("should show authentication buttons when not logged in", () => {
    cy.get("button").contains("Login").should("be.visible");
    cy.get("button").contains("Sign Up").should("be.visible");
  });


});