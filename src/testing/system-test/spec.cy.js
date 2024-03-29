describe("template spec", () => {
  it("passes", () => {
    // Visit the URL
    cy.viewport("iphone-xr");
    cy.visit("http://localhost:3000");

    // Click the login button
    cy.get(".inline-block").click();

    // Enter email and password
    cy.get("#email").type("matgolani@gmail.com");
    cy.wait(1000);
    cy.get("#password").type("12345678");
    cy.wait(1000);

    // Sign in
    cy.get(
      "#auth-sign-in > :nth-child(1) > .supabase-auth-ui_ui-button"
    ).click();
    cy.wait(1000);

    // Enter username
    cy.get(".peer").type("matangolani");
    cy.wait(1000);
    cy.get(".align-middle").click();

    // Scroll to the preferences section and click
    cy.get(".rounded-md").scrollIntoView();
    cy.wait(1000);
    cy.get(".rounded-md").click();
    cy.wait(1000);

    // Select preferences
    cy.get("#Vegan").click();
    cy.wait(1000);
    cy.get("#button").click();
    cy.wait(1000);
    cy.get("#Lupin").click();
    cy.wait(1000);
    cy.get("#Mustard").click();
    cy.wait(1000);
    cy.get(".justify-center > .bg-green-500").click();
    cy.wait(1000);

    // Go to map
    cy.get("#map").click();
    cy.wait(1000);

    // Click on a location
    cy.get(".text-black").click();
    cy.wait(1000);

    // Confirm the selection
    cy.get(":nth-child(1) > .bg-green-500").click();
    cy.wait(1000);

    // Close the popup
    cy.get("body").type("{esc}");
    cy.wait(1000);

    // Click to view details
    cy.get(".translate-x-1").click();
    cy.wait(1000);

    // Go to enquiries
    cy.get('[href="/enquiries"] > .flex > .text-xs').click();

    // Add an enquiry
    cy.get("textarea").type("This is an automated enquiry");
    cy.get('[style="margin-bottom: 20px;"] > button').click();
    cy.wait(1000);

    // Go to settings
    cy.get('[href="/settings"] > .flex > .text-xs').click();
    cy.wait(1000);

    // Update preferences
    cy.get("#Egg").click();
    cy.wait(1000);
    cy.get("#Milk").click();
    cy.wait(1000);
    cy.get("#Peanuts").click();
    cy.wait(1000);
    cy.get("#savepreference").click();
  });
});
