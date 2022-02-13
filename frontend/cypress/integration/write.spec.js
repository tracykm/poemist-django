/// <reference types="cypress" />

describe("Create poem", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/")
  })

  it("clicks letter", () => {
    cy.contains("Create").click()
    cy.contains("Write")
    cy.get(".word").first().click()
  })
})
