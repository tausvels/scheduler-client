describe("Appointments", () => {
  
    beforeEach(() => {
      cy.request("GET", "/api/debug/reset");
    
      cy.visit("/");
    
      cy.contains("Monday");
    });

    xit("Should be able to book an interview", () => {
    cy.get("[alt=Add]")
      .first()
      .click();

    cy.get("[placeholder='Enter Student Name']")
      .type("Tausif Khan");
    
    cy.get("[alt='Tori Malcolm']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Tausif Khan");
    cy.contains(".appointment__card--show", "Sylvia");
  });
  
  xit("Should be able to edit an interview", () => {
    cy.get("[alt=Edit]")
      .first()
      .click({force: true});

    cy.get("[data-testid=student-name-input]").clear().type("Tausif Khan");
    cy.get("[alt='Tori Malcolm']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Tausif Khan");
    cy.contains(".appointment__card--show", "Tori Malcolm");

  });

  it("Should be able to delete an interview", () => {
    cy.get("[alt=Delete]")
      .first()
      .click({force: true})
    cy.contains("Confirm")
      .click();
    cy.contains("DELETING").should("exist");
    cy.contains("DELETING").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
})