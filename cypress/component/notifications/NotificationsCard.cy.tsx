// cypress/notificationsCard.spec.js
/// <reference types="cypress" />

import React from "react";
import NotificationsCard from "<@>/components/notifications/NotificationsCard";
import { mount } from "cypress/react18";

describe("NotificationsCard Component", () => {
  it("renders the component with correct props", () => {
    const title = "Notification Title";
    const content = "Notification Content";
    const date = "2023-08-14";

    mount(<NotificationsCard title={title} content={content} date={date} />);

    cy.get(".border.rounded-md.border-gray-50") // Assuming this is the parent container class
      .should("exist")
      .within(() => {
        cy.contains(".text-lg", title).should("exist");
        cy.contains(content).should("be.visible"); // Assuming ReactQuill renders a div with role="textbox"
        cy.contains("span", date).should("exist");
      });
  });

  // Add more test cases as needed
});