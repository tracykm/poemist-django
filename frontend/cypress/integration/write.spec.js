/// <reference types="cypress" />

describe("Create poem", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("clicks letter", () => {
    cy.contains("Create").click()
    cy.contains("Write")
    cy.get(".word").first().click()
  })
})
