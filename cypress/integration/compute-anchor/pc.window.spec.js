// import 'chai-jquery'
describe("Given Element is window", () => {
  beforeEach(() => {
    cy.visit("index.html");
    cy.wait(100);
    cy.get(".window-example-wrapper .anchor-name").as("anchorName");
  });

  it("Initial there window block should show anchor: window-1", () => {
    cy.get("@anchorName").then(anchorName => {
      expect(anchorName).to.have.text("window-1");
    });
  });

  it("When window scrollTop changed, computed anchor will change too", () => {
    const anchor = `window-${Math.floor(Math.random() * 10) + 2}`;
    cy.get(`#${anchor}`).scrollIntoView();
    cy.wait(50);
    cy.get("@anchorName").then(anchorName => {
      expect(anchorName).to.have.text(anchor);
    });
  });

  it("When window scroll to bottom, the active anchor should be window-20", () => {
    const lastAnchor = "window-20";
    cy.scrollTo("bottom");
    cy.wait(50);
    cy.get("@anchorName").then(anchorName => {
      expect(anchorName).to.have.text(lastAnchor);
    });
  });

  it("After dispose button clicked, anchor name will not change when window scroll", async () => {
    const anchor10 = "window-10";
    cy.get(`#${anchor10}`).scrollIntoView();
    cy.get(".window-example-wrapper .dispose-btn").click();
    cy.scrollTo("bottom");
    cy.get("@anchorName").then(anchorName => {
      expect(anchorName).to.have.text(anchor10);
    });
  });
});
