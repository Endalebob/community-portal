import React from 'react'
import Footer from '../../../src/components/layout/Footer'
import { mount } from 'cypress/react18';
import MockRouter from '../../utils/router';


describe("Footer", () => {
  it("should display social media icons with correct links", () => {

    mount(
    <MockRouter >
    <Footer/>
    </MockRouter>
    );

    cy.get('a[href="https://t.me/a2svofficial"]').should("exist");
    cy.get('a[href="http://www.instagram.com/a2sv_org"]').should("exist");
    cy.get('a[href="https://twitter.com/A2_SV"]').should("exist");
    cy.get('a[href="http://www.linkedin.com/company/a2sv"]').should("exist");
    cy.get('a[href="https://www.facebook.com/profile.php?id=100085473798621"]').should("exist");

  });

});