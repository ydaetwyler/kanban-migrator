// Tickets to migrate
import { tickets } from '../../fixtures/tickets.js'

describe('Migrate Tickets', () => {
    it('open and migrate', () => {
        cy.visit('https://kanban.previon.net/migrator/form')
        
        // Login
        // Username
        cy.get('#username')
            .type(Cypress.env('USERNAME'))
            .should('have.value', Cypress.env('USERNAME'))
        // Password
        cy.get('#password')
            .type(Cypress.env('PASSWORD'))
        // Click
        cy.get('.btn-primary').click()

        cy.visit('https://kanban.previon.net/migrator/form')

        // Loop through tickets
        for (let i = 0; i < tickets.length; i++) {
            // Insert ticket id
            cy.get('input[name="ticket_id"]')
            .type(`${tickets[i]}`)
            .should('have.value', `${tickets[i]}`)
            // Click
            cy.get('.btn-primary').click()

            // Assert migration OK or log to console if not
            cy.get('body').then(body => {
                (body.text().includes('wurde erfolgreich migriert.'))
                    ? console.log(`ok -> ${tickets[i]}`)
                    : console.log(`ERROR -> ${tickets[i]}`)
            })
        }
    })
})