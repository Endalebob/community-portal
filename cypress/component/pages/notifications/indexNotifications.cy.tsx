import { mount } from "cypress/react18";
import MockRouter from '../../../utils/router';
import Notifications from "<@>/pages/notifications";
import '@testing-library/cypress/add-commands';
import { Provider } from "react-redux";
import { store } from "<@>/store";

describe('Notifications Component', () => {
  beforeEach(() => {
    cy.intercept('GET', "https://a2sv-community-portal-api.onrender.com/api/Notifications", {
      fixture: 'notifications/notifications.json',
    });

    mount(
      <Provider store={store}>
      <MockRouter>
        <Notifications />
      </MockRouter>
      </Provider>
    );

  });

  it('displays the notifications', () => {
    cy.contains('Notification 1').should('exist');
    cy.contains('Notification 2').should('exist');
  });


});

// describe('No Notification Component', () => {
//   beforeEach(() => {
//     cy.intercept('GET', "https://a2sv-community-portal-api.onrender.com/api/Notifications", {
//       fixture: 'notifications/noNotifications.json',
//     });

//     mount(
//       <Provider store={store}>
//       <MockRouter>
//         <Notifications />
//       </MockRouter>
//       </Provider>
//     );

//   })



// it('Displays no notifications text', () => {
//   cy.contains('You don\'t have any notifications.')
//     .should('be.visible')
// })
// });
