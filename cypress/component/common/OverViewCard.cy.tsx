import OverViewCard from "<@>/components/common/OverViewCard";
import { mount } from "cypress/react18";
import React from "react";
import { BsPerson } from "react-icons/bs";

describe("OverViewCard Component", () => {
  it("renders the card with provided props", () => {
    const props = {
      icon: BsPerson, // Replace with the appropriate icon component
      title: "Total Users",
      number: 100,
    };

    mount(<OverViewCard {...props} />);

    cy.get(".text-primary-text").should("contain", "100");
    cy.get(".text-secondary-text").should("contain", "Total Users");
  });

});
