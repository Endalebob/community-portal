import React from 'react'
import IsOverviewLoading from '../../../src/components/contest/IsOverviewLoading'

describe('<IsOverviewLoading />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<IsOverviewLoading />)
  })
})