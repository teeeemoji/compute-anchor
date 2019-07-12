// import 'chai-jquery'
describe("Given Element is a div", () => {
  beforeEach(() => {
    cy.visit("index.html");
    cy.wait(100);
    cy.get(".element-example-wrapper .anchor-name").as("anchorName");
    cy.get(".element-example-wrapper").as("container");
  });

  it("When div scrollTop changed, computed anchor will change too", () => {
    const anchor = `element-${Math.floor(Math.random() * 10) + 2}`;
    let anchorDom = cy.get(`#${anchor}`);
    let container = cy.get("@container");
    let anchorName = cy.get("@anchorName");
    anchorDom.scrollIntoView();
    container.trigger("mousewheel", { deltaY: 1 });
    anchorName.then(anchorName => {
      expect(anchorName).to.have.text(anchor);
    });
  });

  it("When div scroll to bottom, the active anchor should be element-20", () => {
    const lastAnchor = "element-20";
    cy.get("@container").scrollTo("bottom");
    cy.wait(50);
    cy.get("@anchorName").then(windowName => {
      expect(windowName).to.have.text(lastAnchor);
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
