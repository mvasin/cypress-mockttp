/// <reference types="cypress" />
import {getRemote} from 'mockttp'

const server = getRemote()

const mockedResponse = 'this is a mocked response'

before(async () => {
  // Starts the server on a dynamic port. The port number that can later be
  // retrieved as server.url
  await server.start()
  await server.get("/mocked-path").thenReply(200, mockedResponse)
})

after(async () => {
  await server.stop()
})

describe('Mockttp serves mocked responses', () => {
  it('to cy.request', () => {
    // We make the request from Cypress' Node.js process, and it receives
    // the mocked response we pre-programmed just before
    const url = server.url + '/mocked-path'
    cy.request(url).its('body').should('equal', mockedResponse)
  })
})