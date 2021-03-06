describe('Circle Tag Tests', function () {

  beforeEach(() => {
    cy.visit('/test')

  })

  it('circle with no parameters gives unit circle', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <graph>
    <circle/>
    </graph>
    <graph>
    <copy prop="center" name="centerPoint" tname="_circle1" />
    <point>(<copy prop="radius" tname="_circle1" />, 0)</point>
    </graph>
    <copy prop="radius" name="radiusNumber" tname="_circle1" />
    <graph name="graph3">
      <copy name="circle2" tname="_circle1" />
    </graph>
    <copy name="graph4" tname="graph3" />
    `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a'); // to wait for page to load

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);

      let centerPoint = components["/centerPoint"].replacements[0];
      let radiusNumber = components["/radiusNumber"].replacements[0];
      let circle2 = components["/circle2"].replacements[0];
      let circle3 = components["/graph4"].replacements[0].activeChildren[0];

      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 0, 0]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([0, 0]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(1);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(1);
        expect(circle2.stateValues.center.tree).eqls(["vector", 0, 0]);
        expect(circle2.stateValues.numericalCenter).eqls([0, 0]);
        expect(circle2.stateValues.radius.tree).eq(1);
        expect(circle2.stateValues.numericalRadius).eq(1);
        expect(circle3.stateValues.center.tree).eqls(["vector", 0, 0]);
        expect(circle3.stateValues.numericalCenter).eqls([0, 0]);
        expect(circle3.stateValues.radius.tree).eq(1);
        expect(circle3.stateValues.numericalRadius).eq(1);
        expect(centerPoint.stateValues.xs[0].tree).eq(0);
        expect(centerPoint.stateValues.xs[1].tree).eq(0);
        expect(radiusNumber.stateValues.value.tree).eq(1);
      })

      cy.log("move circle")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        components['/_circle1'].moveCircle({ center: [2, 3] });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 2, 3]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([2, 3]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(1);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(1);
        expect(circle2.stateValues.center.tree).eqls(["vector", 2, 3]);
        expect(circle2.stateValues.numericalCenter).eqls([2, 3]);
        expect(circle2.stateValues.radius.tree).eq(1);
        expect(circle2.stateValues.numericalRadius).eq(1);
        expect(circle3.stateValues.center.tree).eqls(["vector", 2, 3]);
        expect(circle3.stateValues.numericalCenter).eqls([2, 3]);
        expect(circle3.stateValues.radius.tree).eq(1);
        expect(circle3.stateValues.numericalRadius).eq(1);
        expect(centerPoint.stateValues.xs[0].tree).eq(2);
        expect(centerPoint.stateValues.xs[1].tree).eq(3);
        expect(radiusNumber.stateValues.value.tree).eq(1);
      })


      cy.log("change radius")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        components['/_point1'].movePoint({ x: 5, y: 0 });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 2, 3]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([2, 3]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(5);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(5);
        expect(circle2.stateValues.center.tree).eqls(["vector", 2, 3]);
        expect(circle2.stateValues.numericalCenter).eqls([2, 3]);
        expect(circle2.stateValues.radius.tree).eq(5);
        expect(circle2.stateValues.numericalRadius).eq(5);
        expect(circle3.stateValues.center.tree).eqls(["vector", 2, 3]);
        expect(circle3.stateValues.numericalCenter).eqls([2, 3]);
        expect(circle3.stateValues.radius.tree).eq(5);
        expect(circle3.stateValues.numericalRadius).eq(5);
        expect(centerPoint.stateValues.xs[0].tree).eq(2);
        expect(centerPoint.stateValues.xs[1].tree).eq(3);
        expect(radiusNumber.stateValues.value.tree).eq(5);
      })

      cy.log("change center")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        centerPoint.movePoint({ x: -6, y: -2 });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", -6, -2]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([-6, -2]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(5);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(5);
        expect(circle2.stateValues.center.tree).eqls(["vector", -6, -2]);
        expect(circle2.stateValues.numericalCenter).eqls([-6, -2]);
        expect(circle2.stateValues.radius.tree).eq(5);
        expect(circle2.stateValues.numericalRadius).eq(5);
        expect(circle3.stateValues.center.tree).eqls(["vector", -6, -2]);
        expect(circle3.stateValues.numericalCenter).eqls([-6, -2]);
        expect(circle3.stateValues.radius.tree).eq(5);
        expect(circle3.stateValues.numericalRadius).eq(5);
        expect(centerPoint.stateValues.xs[0].tree).eq(-6);
        expect(centerPoint.stateValues.xs[1].tree).eq(-2);
        expect(radiusNumber.stateValues.value.tree).eq(5);
      })

      cy.log("move circle2")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        circle2.moveCircle({ center: [-7, 9] });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", -7, 9]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([-7, 9]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(5);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(5);
        expect(circle2.stateValues.center.tree).eqls(["vector", -7, 9]);
        expect(circle2.stateValues.numericalCenter).eqls([-7, 9]);
        expect(circle2.stateValues.radius.tree).eq(5);
        expect(circle2.stateValues.numericalRadius).eq(5);
        expect(circle3.stateValues.center.tree).eqls(["vector", -7, 9]);
        expect(circle3.stateValues.numericalCenter).eqls([-7, 9]);
        expect(circle3.stateValues.radius.tree).eq(5);
        expect(circle3.stateValues.numericalRadius).eq(5);
        expect(centerPoint.stateValues.xs[0].tree).eq(-7);
        expect(centerPoint.stateValues.xs[1].tree).eq(9);
        expect(radiusNumber.stateValues.value.tree).eq(5);
      })


      cy.log("move circle3")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        circle3.moveCircle({ center: [6, -8] });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 6, -8]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([6, -8]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(5);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(5);
        expect(circle2.stateValues.center.tree).eqls(["vector", 6, -8]);
        expect(circle2.stateValues.numericalCenter).eqls([6, -8]);
        expect(circle2.stateValues.radius.tree).eq(5);
        expect(circle2.stateValues.numericalRadius).eq(5);
        expect(circle3.stateValues.center.tree).eqls(["vector", 6, -8]);
        expect(circle3.stateValues.numericalCenter).eqls([6, -8]);
        expect(circle3.stateValues.radius.tree).eq(5);
        expect(circle3.stateValues.numericalRadius).eq(5);
        expect(centerPoint.stateValues.xs[0].tree).eq(6);
        expect(centerPoint.stateValues.xs[1].tree).eq(-8);
        expect(radiusNumber.stateValues.value.tree).eq(5);
      })

    })

  });

  it('circle with string point for sugared for center', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <graph>
    <circle>(-1,3)</circle>
    </graph>
    <graph>
    <copy prop="center" name="centerPoint" tname="_circle1" />
    <point>(<copy prop="radius" tname="_circle1" />, 0)</point>
    </graph>
    <copy prop="radius" name="radiusNumber" tname="_circle1" />
    <graph name="graph3">
      <copy name="circle2" tname="_circle1" />
    </graph>
    <copy name="graph4" tname="graph3" />
    `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a')// to wait for page to load

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);

      let definingCenter = components["/_circle1"].activeChildren[0];
      let centerPoint = components["/centerPoint"].replacements[0]
      let radiusNumber = components["/radiusNumber"].replacements[0]
      let circle2 = components["/circle2"].replacements[0];
      let circle3 = components["/graph4"].replacements[0].activeChildren[0];

      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", -1, 3]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([-1, 3]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(1);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(1);
        expect(circle2.stateValues.center.tree).eqls(["vector", -1, 3]);
        expect(circle2.stateValues.numericalCenter).eqls([-1, 3]);
        expect(circle2.stateValues.radius.tree).eq(1);
        expect(circle2.stateValues.numericalRadius).eq(1);
        expect(circle3.stateValues.center.tree).eqls(["vector", -1, 3]);
        expect(circle3.stateValues.numericalCenter).eqls([-1, 3]);
        expect(circle3.stateValues.radius.tree).eq(1);
        expect(circle3.stateValues.numericalRadius).eq(1);
        expect(definingCenter.stateValues.xs[0].tree).eq(-1);
        expect(definingCenter.stateValues.xs[1].tree).eq(3);
        expect(centerPoint.stateValues.xs[0].tree).eq(-1);
        expect(centerPoint.stateValues.xs[1].tree).eq(3);
        expect(radiusNumber.stateValues.value.tree).eq(1);
      })

      cy.log("move circle")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        components['/_circle1'].moveCircle({ center: [2, 4] });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 2, 4]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([2, 4]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(1);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(1);
        expect(circle2.stateValues.center.tree).eqls(["vector", 2, 4]);
        expect(circle2.stateValues.numericalCenter).eqls([2, 4]);
        expect(circle2.stateValues.radius.tree).eq(1);
        expect(circle2.stateValues.numericalRadius).eq(1);
        expect(circle3.stateValues.center.tree).eqls(["vector", 2, 4]);
        expect(circle3.stateValues.numericalCenter).eqls([2, 4]);
        expect(circle3.stateValues.radius.tree).eq(1);
        expect(circle3.stateValues.numericalRadius).eq(1);
        expect(definingCenter.stateValues.xs[0].tree).eq(2);
        expect(definingCenter.stateValues.xs[1].tree).eq(4);
        expect(centerPoint.stateValues.xs[0].tree).eq(2);
        expect(centerPoint.stateValues.xs[1].tree).eq(4);
        expect(radiusNumber.stateValues.value.tree).eq(1);
      })


      cy.log("change radius")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        components['/_point1'].movePoint({ x: 5, y: 0 });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 2, 4]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([2, 4]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(5);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(5);
        expect(circle2.stateValues.center.tree).eqls(["vector", 2, 4]);
        expect(circle2.stateValues.numericalCenter).eqls([2, 4]);
        expect(circle2.stateValues.radius.tree).eq(5);
        expect(circle2.stateValues.numericalRadius).eq(5);
        expect(circle3.stateValues.center.tree).eqls(["vector", 2, 4]);
        expect(circle3.stateValues.numericalCenter).eqls([2, 4]);
        expect(circle3.stateValues.radius.tree).eq(5);
        expect(circle3.stateValues.numericalRadius).eq(5);
        expect(definingCenter.stateValues.xs[0].tree).eq(2);
        expect(definingCenter.stateValues.xs[1].tree).eq(4);
        expect(centerPoint.stateValues.xs[0].tree).eq(2);
        expect(centerPoint.stateValues.xs[1].tree).eq(4);
        expect(radiusNumber.stateValues.value.tree).eq(5);
      })

      cy.log("change center via defining point")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        definingCenter.movePoint({ x: -6, y: -2 });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", -6, -2]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([-6, -2]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(5);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(5);
        expect(circle2.stateValues.center.tree).eqls(["vector", -6, -2]);
        expect(circle2.stateValues.numericalCenter).eqls([-6, -2]);
        expect(circle2.stateValues.radius.tree).eq(5);
        expect(circle2.stateValues.numericalRadius).eq(5);
        expect(circle3.stateValues.center.tree).eqls(["vector", -6, -2]);
        expect(circle3.stateValues.numericalCenter).eqls([-6, -2]);
        expect(circle3.stateValues.radius.tree).eq(5);
        expect(circle3.stateValues.numericalRadius).eq(5);
        expect(definingCenter.stateValues.xs[0].tree).eq(-6);
        expect(definingCenter.stateValues.xs[1].tree).eq(-2);
        expect(centerPoint.stateValues.xs[0].tree).eq(-6);
        expect(centerPoint.stateValues.xs[1].tree).eq(-2);
        expect(radiusNumber.stateValues.value.tree).eq(5);
      })


      cy.log("change center via reffed point")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        centerPoint.movePoint({ x: -7, y: 8 });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", -7, 8]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([-7, 8]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(5);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(5);
        expect(circle2.stateValues.center.tree).eqls(["vector", -7, 8]);
        expect(circle2.stateValues.numericalCenter).eqls([-7, 8]);
        expect(circle2.stateValues.radius.tree).eq(5);
        expect(circle2.stateValues.numericalRadius).eq(5);
        expect(circle3.stateValues.center.tree).eqls(["vector", -7, 8]);
        expect(circle3.stateValues.numericalCenter).eqls([-7, 8]);
        expect(circle3.stateValues.radius.tree).eq(5);
        expect(circle3.stateValues.numericalRadius).eq(5);
        expect(definingCenter.stateValues.xs[0].tree).eq(-7);
        expect(definingCenter.stateValues.xs[1].tree).eq(8);
        expect(centerPoint.stateValues.xs[0].tree).eq(-7);
        expect(centerPoint.stateValues.xs[1].tree).eq(8);
        expect(radiusNumber.stateValues.value.tree).eq(5);
      })


      cy.log("move circle2")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        circle2.moveCircle({ center: [9, -10] });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 9, -10]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([9, -10]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(5);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(5);
        expect(circle2.stateValues.center.tree).eqls(["vector", 9, -10]);
        expect(circle2.stateValues.numericalCenter).eqls([9, -10]);
        expect(circle2.stateValues.radius.tree).eq(5);
        expect(circle2.stateValues.numericalRadius).eq(5);
        expect(circle3.stateValues.center.tree).eqls(["vector", 9, -10]);
        expect(circle3.stateValues.numericalCenter).eqls([9, -10]);
        expect(circle3.stateValues.radius.tree).eq(5);
        expect(circle3.stateValues.numericalRadius).eq(5);
        expect(definingCenter.stateValues.xs[0].tree).eq(9);
        expect(definingCenter.stateValues.xs[1].tree).eq(-10);
        expect(centerPoint.stateValues.xs[0].tree).eq(9);
        expect(centerPoint.stateValues.xs[1].tree).eq(-10);
        expect(radiusNumber.stateValues.value.tree).eq(5);
      })


      cy.log("move circle3")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        circle3.moveCircle({ center: [-3, -4] });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", -3, -4]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([-3, -4]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(5);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(5);
        expect(circle2.stateValues.center.tree).eqls(["vector", -3, -4]);
        expect(circle2.stateValues.numericalCenter).eqls([-3, -4]);
        expect(circle2.stateValues.radius.tree).eq(5);
        expect(circle2.stateValues.numericalRadius).eq(5);
        expect(circle3.stateValues.center.tree).eqls(["vector", -3, -4]);
        expect(circle3.stateValues.numericalCenter).eqls([-3, -4]);
        expect(circle3.stateValues.radius.tree).eq(5);
        expect(circle3.stateValues.numericalRadius).eq(5);
        expect(definingCenter.stateValues.xs[0].tree).eq(-3);
        expect(definingCenter.stateValues.xs[1].tree).eq(-4);
        expect(centerPoint.stateValues.xs[0].tree).eq(-3);
        expect(centerPoint.stateValues.xs[1].tree).eq(-4);
        expect(radiusNumber.stateValues.value.tree).eq(5);
      })
    })

  });

  it('circle with point sugared for center', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <graph>
    <circle><point>(-1,3)</point></circle>
    </graph>
    <graph>
    <copy prop="center" name="centerPoint" tname="_circle1" />
    <point>(<copy prop="radius" tname="_circle1" />, 0)</point>
    </graph>
    <copy prop="radius" name="radiusNumber" tname="_circle1" />
    <graph name="graph3">
      <copy name="circle2" tname="_circle1" />
    </graph>
    <copy name="graph4" tname="graph3" />
    `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a')// to wait for page to load

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);

      let centerPoint = components["/centerPoint"].replacements[0]
      let radiusNumber = components["/radiusNumber"].replacements[0]
      let circle2 = components["/circle2"].replacements[0];
      let circle3 = components["/graph4"].replacements[0].activeChildren[0];

      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", -1, 3]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([-1, 3]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(1);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(1);
        expect(circle2.stateValues.center.tree).eqls(["vector", -1, 3]);
        expect(circle2.stateValues.numericalCenter).eqls([-1, 3]);
        expect(circle2.stateValues.radius.tree).eq(1);
        expect(circle2.stateValues.numericalRadius).eq(1);
        expect(circle3.stateValues.center.tree).eqls(["vector", -1, 3]);
        expect(circle3.stateValues.numericalCenter).eqls([-1, 3]);
        expect(circle3.stateValues.radius.tree).eq(1);
        expect(circle3.stateValues.numericalRadius).eq(1);
        expect(components['/_point1'].stateValues.xs[0].tree).eq(-1);
        expect(components['/_point1'].stateValues.xs[1].tree).eq(3);
        expect(centerPoint.stateValues.xs[0].tree).eq(-1);
        expect(centerPoint.stateValues.xs[1].tree).eq(3);
        expect(radiusNumber.stateValues.value.tree).eq(1);
      })

      cy.log("move circle")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        components['/_circle1'].moveCircle({ center: [2, 4] });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 2, 4]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([2, 4]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(1);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(1);
        expect(circle2.stateValues.center.tree).eqls(["vector", 2, 4]);
        expect(circle2.stateValues.numericalCenter).eqls([2, 4]);
        expect(circle2.stateValues.radius.tree).eq(1);
        expect(circle2.stateValues.numericalRadius).eq(1);
        expect(circle3.stateValues.center.tree).eqls(["vector", 2, 4]);
        expect(circle3.stateValues.numericalCenter).eqls([2, 4]);
        expect(circle3.stateValues.radius.tree).eq(1);
        expect(circle3.stateValues.numericalRadius).eq(1);
        expect(components['/_point1'].stateValues.xs[0].tree).eq(2);
        expect(components['/_point1'].stateValues.xs[1].tree).eq(4);
        expect(centerPoint.stateValues.xs[0].tree).eq(2);
        expect(centerPoint.stateValues.xs[1].tree).eq(4);
        expect(radiusNumber.stateValues.value.tree).eq(1);
      })


      cy.log("change radius")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        components['/_point2'].movePoint({ x: 5, y: 0 });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 2, 4]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([2, 4]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(5);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(5);
        expect(circle2.stateValues.center.tree).eqls(["vector", 2, 4]);
        expect(circle2.stateValues.numericalCenter).eqls([2, 4]);
        expect(circle2.stateValues.radius.tree).eq(5);
        expect(circle2.stateValues.numericalRadius).eq(5);
        expect(circle3.stateValues.center.tree).eqls(["vector", 2, 4]);
        expect(circle3.stateValues.numericalCenter).eqls([2, 4]);
        expect(circle3.stateValues.radius.tree).eq(5);
        expect(circle3.stateValues.numericalRadius).eq(5);
        expect(components['/_point1'].stateValues.xs[0].tree).eq(2);
        expect(components['/_point1'].stateValues.xs[1].tree).eq(4);
        expect(centerPoint.stateValues.xs[0].tree).eq(2);
        expect(centerPoint.stateValues.xs[1].tree).eq(4);
        expect(radiusNumber.stateValues.value.tree).eq(5);
      })

      cy.log("change center via defining point")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        components['/_point1'].movePoint({ x: -6, y: -2 });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", -6, -2]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([-6, -2]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(5);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(5);
        expect(circle2.stateValues.center.tree).eqls(["vector", -6, -2]);
        expect(circle2.stateValues.numericalCenter).eqls([-6, -2]);
        expect(circle2.stateValues.radius.tree).eq(5);
        expect(circle2.stateValues.numericalRadius).eq(5);
        expect(circle3.stateValues.center.tree).eqls(["vector", -6, -2]);
        expect(circle3.stateValues.numericalCenter).eqls([-6, -2]);
        expect(circle3.stateValues.radius.tree).eq(5);
        expect(circle3.stateValues.numericalRadius).eq(5);
        expect(components['/_point1'].stateValues.xs[0].tree).eq(-6);
        expect(components['/_point1'].stateValues.xs[1].tree).eq(-2);
        expect(centerPoint.stateValues.xs[0].tree).eq(-6);
        expect(centerPoint.stateValues.xs[1].tree).eq(-2);
        expect(radiusNumber.stateValues.value.tree).eq(5);
      })


      cy.log("change center via reffed point")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        centerPoint.movePoint({ x: -7, y: 8 });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", -7, 8]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([-7, 8]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(5);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(5);
        expect(circle2.stateValues.center.tree).eqls(["vector", -7, 8]);
        expect(circle2.stateValues.numericalCenter).eqls([-7, 8]);
        expect(circle2.stateValues.radius.tree).eq(5);
        expect(circle2.stateValues.numericalRadius).eq(5);
        expect(circle3.stateValues.center.tree).eqls(["vector", -7, 8]);
        expect(circle3.stateValues.numericalCenter).eqls([-7, 8]);
        expect(circle3.stateValues.radius.tree).eq(5);
        expect(circle3.stateValues.numericalRadius).eq(5);
        expect(components['/_point1'].stateValues.xs[0].tree).eq(-7);
        expect(components['/_point1'].stateValues.xs[1].tree).eq(8);
        expect(centerPoint.stateValues.xs[0].tree).eq(-7);
        expect(centerPoint.stateValues.xs[1].tree).eq(8);
        expect(radiusNumber.stateValues.value.tree).eq(5);
      })


      cy.log("move circle2")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        circle2.moveCircle({ center: [9, -10] });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 9, -10]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([9, -10]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(5);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(5);
        expect(circle2.stateValues.center.tree).eqls(["vector", 9, -10]);
        expect(circle2.stateValues.numericalCenter).eqls([9, -10]);
        expect(circle2.stateValues.radius.tree).eq(5);
        expect(circle2.stateValues.numericalRadius).eq(5);
        expect(circle3.stateValues.center.tree).eqls(["vector", 9, -10]);
        expect(circle3.stateValues.numericalCenter).eqls([9, -10]);
        expect(circle3.stateValues.radius.tree).eq(5);
        expect(circle3.stateValues.numericalRadius).eq(5);
        expect(components['/_point1'].stateValues.xs[0].tree).eq(9);
        expect(components['/_point1'].stateValues.xs[1].tree).eq(-10);
        expect(centerPoint.stateValues.xs[0].tree).eq(9);
        expect(centerPoint.stateValues.xs[1].tree).eq(-10);
        expect(radiusNumber.stateValues.value.tree).eq(5);
      })


      cy.log("move circle3")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        circle3.moveCircle({ center: [-3, -4] });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", -3, -4]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([-3, -4]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(5);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(5);
        expect(circle2.stateValues.center.tree).eqls(["vector", -3, -4]);
        expect(circle2.stateValues.numericalCenter).eqls([-3, -4]);
        expect(circle2.stateValues.radius.tree).eq(5);
        expect(circle2.stateValues.numericalRadius).eq(5);
        expect(circle3.stateValues.center.tree).eqls(["vector", -3, -4]);
        expect(circle3.stateValues.numericalCenter).eqls([-3, -4]);
        expect(circle3.stateValues.radius.tree).eq(5);
        expect(circle3.stateValues.numericalRadius).eq(5);
        expect(components['/_point1'].stateValues.xs[0].tree).eq(-3);
        expect(components['/_point1'].stateValues.xs[1].tree).eq(-4);
        expect(centerPoint.stateValues.xs[0].tree).eq(-3);
        expect(centerPoint.stateValues.xs[1].tree).eq(-4);
        expect(radiusNumber.stateValues.value.tree).eq(5);
      })
    })
  });

  it('circle with center containing sugared point', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <graph>
    <circle><center>(-1,3)</center></circle>
    </graph>
    <graph>
    <copy prop="center" name="centerPoint" tname="_circle1" />
    <point>(<copy prop="radius" tname="_circle1" />, 0)</point>
    </graph>
    <copy prop="radius" name="radiusNumber" tname="_circle1" />
    <graph name="graph3">
      <copy name="circle2" tname="_circle1" />
    </graph>
    <copy name="graph4" tname="graph3" />
    `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a')// to wait for page to load

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);

      let centerPoint = components["/centerPoint"].replacements[0]
      let radiusNumber = components["/radiusNumber"].replacements[0]
      let circle2 = components["/circle2"].replacements[0];
      let circle3 = components["/graph4"].replacements[0].activeChildren[0];

      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", -1, 3]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([-1, 3]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(1);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(1);
        expect(circle2.stateValues.center.tree).eqls(["vector", -1, 3]);
        expect(circle2.stateValues.numericalCenter).eqls([-1, 3]);
        expect(circle2.stateValues.radius.tree).eq(1);
        expect(circle2.stateValues.numericalRadius).eq(1);
        expect(circle3.stateValues.center.tree).eqls(["vector", -1, 3]);
        expect(circle3.stateValues.numericalCenter).eqls([-1, 3]);
        expect(circle3.stateValues.radius.tree).eq(1);
        expect(circle3.stateValues.numericalRadius).eq(1);
        expect(components['/_center1'].stateValues.xs[0].tree).eq(-1);
        expect(components['/_center1'].stateValues.xs[1].tree).eq(3);
        expect(centerPoint.stateValues.xs[0].tree).eq(-1);
        expect(centerPoint.stateValues.xs[1].tree).eq(3);
        expect(radiusNumber.stateValues.value.tree).eq(1);
      })

      cy.log("move circle")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        components['/_circle1'].moveCircle({ center: [2, 4] });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 2, 4]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([2, 4]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(1);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(1);
        expect(circle2.stateValues.center.tree).eqls(["vector", 2, 4]);
        expect(circle2.stateValues.numericalCenter).eqls([2, 4]);
        expect(circle2.stateValues.radius.tree).eq(1);
        expect(circle2.stateValues.numericalRadius).eq(1);
        expect(circle3.stateValues.center.tree).eqls(["vector", 2, 4]);
        expect(circle3.stateValues.numericalCenter).eqls([2, 4]);
        expect(circle3.stateValues.radius.tree).eq(1);
        expect(circle3.stateValues.numericalRadius).eq(1);
        expect(components['/_center1'].stateValues.xs[0].tree).eq(2);
        expect(components['/_center1'].stateValues.xs[1].tree).eq(4);
        expect(centerPoint.stateValues.xs[0].tree).eq(2);
        expect(centerPoint.stateValues.xs[1].tree).eq(4);
        expect(radiusNumber.stateValues.value.tree).eq(1);
      })


      cy.log("change radius")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        components['/_point1'].movePoint({ x: 5, y: 0 });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 2, 4]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([2, 4]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(5);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(5);
        expect(circle2.stateValues.center.tree).eqls(["vector", 2, 4]);
        expect(circle2.stateValues.numericalCenter).eqls([2, 4]);
        expect(circle2.stateValues.radius.tree).eq(5);
        expect(circle2.stateValues.numericalRadius).eq(5);
        expect(circle3.stateValues.center.tree).eqls(["vector", 2, 4]);
        expect(circle3.stateValues.numericalCenter).eqls([2, 4]);
        expect(circle3.stateValues.radius.tree).eq(5);
        expect(circle3.stateValues.numericalRadius).eq(5);
        expect(components['/_center1'].stateValues.xs[0].tree).eq(2);
        expect(components['/_center1'].stateValues.xs[1].tree).eq(4);
        expect(centerPoint.stateValues.xs[0].tree).eq(2);
        expect(centerPoint.stateValues.xs[1].tree).eq(4);
        expect(radiusNumber.stateValues.value.tree).eq(5);
      })

      cy.log("change center via defining point")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        components['/_center1'].movePoint({ x: -6, y: -2 });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", -6, -2]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([-6, -2]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(5);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(5);
        expect(circle2.stateValues.center.tree).eqls(["vector", -6, -2]);
        expect(circle2.stateValues.numericalCenter).eqls([-6, -2]);
        expect(circle2.stateValues.radius.tree).eq(5);
        expect(circle2.stateValues.numericalRadius).eq(5);
        expect(circle3.stateValues.center.tree).eqls(["vector", -6, -2]);
        expect(circle3.stateValues.numericalCenter).eqls([-6, -2]);
        expect(circle3.stateValues.radius.tree).eq(5);
        expect(circle3.stateValues.numericalRadius).eq(5);
        expect(components['/_center1'].stateValues.xs[0].tree).eq(-6);
        expect(components['/_center1'].stateValues.xs[1].tree).eq(-2);
        expect(centerPoint.stateValues.xs[0].tree).eq(-6);
        expect(centerPoint.stateValues.xs[1].tree).eq(-2);
        expect(radiusNumber.stateValues.value.tree).eq(5);
      })


      cy.log("change center via reffed point")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        centerPoint.movePoint({ x: -7, y: 8 });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", -7, 8]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([-7, 8]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(5);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(5);
        expect(circle2.stateValues.center.tree).eqls(["vector", -7, 8]);
        expect(circle2.stateValues.numericalCenter).eqls([-7, 8]);
        expect(circle2.stateValues.radius.tree).eq(5);
        expect(circle2.stateValues.numericalRadius).eq(5);
        expect(circle3.stateValues.center.tree).eqls(["vector", -7, 8]);
        expect(circle3.stateValues.numericalCenter).eqls([-7, 8]);
        expect(circle3.stateValues.radius.tree).eq(5);
        expect(circle3.stateValues.numericalRadius).eq(5);
        expect(components['/_center1'].stateValues.xs[0].tree).eq(-7);
        expect(components['/_center1'].stateValues.xs[1].tree).eq(8);
        expect(centerPoint.stateValues.xs[0].tree).eq(-7);
        expect(centerPoint.stateValues.xs[1].tree).eq(8);
        expect(radiusNumber.stateValues.value.tree).eq(5);
      })

      cy.log("move circle2")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        circle2.moveCircle({ center: [9, -10] });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 9, -10]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([9, -10]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(5);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(5);
        expect(circle2.stateValues.center.tree).eqls(["vector", 9, -10]);
        expect(circle2.stateValues.numericalCenter).eqls([9, -10]);
        expect(circle2.stateValues.radius.tree).eq(5);
        expect(circle2.stateValues.numericalRadius).eq(5);
        expect(circle3.stateValues.center.tree).eqls(["vector", 9, -10]);
        expect(circle3.stateValues.numericalCenter).eqls([9, -10]);
        expect(circle3.stateValues.radius.tree).eq(5);
        expect(circle3.stateValues.numericalRadius).eq(5);
        expect(components['/_center1'].stateValues.xs[0].tree).eq(9);
        expect(components['/_center1'].stateValues.xs[1].tree).eq(-10);
        expect(centerPoint.stateValues.xs[0].tree).eq(9);
        expect(centerPoint.stateValues.xs[1].tree).eq(-10);
        expect(radiusNumber.stateValues.value.tree).eq(5);
      })

      cy.log("move circle3")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        circle3.moveCircle({ center: [-3, -4] });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", -3, -4]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([-3, -4]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(5);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(5);
        expect(circle2.stateValues.center.tree).eqls(["vector", -3, -4]);
        expect(circle2.stateValues.numericalCenter).eqls([-3, -4]);
        expect(circle2.stateValues.radius.tree).eq(5);
        expect(circle2.stateValues.numericalRadius).eq(5);
        expect(circle3.stateValues.center.tree).eqls(["vector", -3, -4]);
        expect(circle3.stateValues.numericalCenter).eqls([-3, -4]);
        expect(circle3.stateValues.radius.tree).eq(5);
        expect(circle3.stateValues.numericalRadius).eq(5);
        expect(components['/_center1'].stateValues.xs[0].tree).eq(-3);
        expect(components['/_center1'].stateValues.xs[1].tree).eq(-4);
        expect(centerPoint.stateValues.xs[0].tree).eq(-3);
        expect(centerPoint.stateValues.xs[1].tree).eq(-4);
        expect(radiusNumber.stateValues.value.tree).eq(5);
      })
    })
  });

  it('circle with full center point', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <graph>
    <circle><center><point>(-1,3)</point></center></circle>
    </graph>
    <graph>
    <copy prop="center" name="centerPoint" tname="_circle1" />
    <point>(<copy prop="radius" tname="_circle1" />, 0)</point>
    </graph>
    <copy prop="radius" name="radiusNumber" tname="_circle1" />
    <graph name="graph3">
      <copy name="circle2" tname="_circle1" />
    </graph>
    <copy name="graph4" tname="graph3" />
    `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a')// to wait for page to load

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);

      let centerPoint = components["/centerPoint"].replacements[0]
      let radiusNumber = components["/radiusNumber"].replacements[0]
      let circle2 = components["/circle2"].replacements[0];
      let circle3 = components["/graph4"].replacements[0].activeChildren[0];

      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", -1, 3]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([-1, 3]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(1);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(1);
        expect(circle2.stateValues.center.tree).eqls(["vector", -1, 3]);
        expect(circle2.stateValues.numericalCenter).eqls([-1, 3]);
        expect(circle2.stateValues.radius.tree).eq(1);
        expect(circle2.stateValues.numericalRadius).eq(1);
        expect(circle3.stateValues.center.tree).eqls(["vector", -1, 3]);
        expect(circle3.stateValues.numericalCenter).eqls([-1, 3]);
        expect(circle3.stateValues.radius.tree).eq(1);
        expect(circle3.stateValues.numericalRadius).eq(1);
        expect(components['/_point1'].stateValues.xs[0].tree).eq(-1);
        expect(components['/_point1'].stateValues.xs[1].tree).eq(3);
        expect(centerPoint.stateValues.xs[0].tree).eq(-1);
        expect(centerPoint.stateValues.xs[1].tree).eq(3);
        expect(radiusNumber.stateValues.value.tree).eq(1);
      })

      cy.log("move circle")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        components['/_circle1'].moveCircle({ center: [2, 4] });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 2, 4]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([2, 4]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(1);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(1);
        expect(circle2.stateValues.center.tree).eqls(["vector", 2, 4]);
        expect(circle2.stateValues.numericalCenter).eqls([2, 4]);
        expect(circle2.stateValues.radius.tree).eq(1);
        expect(circle2.stateValues.numericalRadius).eq(1);
        expect(circle3.stateValues.center.tree).eqls(["vector", 2, 4]);
        expect(circle3.stateValues.numericalCenter).eqls([2, 4]);
        expect(circle3.stateValues.radius.tree).eq(1);
        expect(circle3.stateValues.numericalRadius).eq(1);
        expect(components['/_point1'].stateValues.xs[0].tree).eq(2);
        expect(components['/_point1'].stateValues.xs[1].tree).eq(4);
        expect(centerPoint.stateValues.xs[0].tree).eq(2);
        expect(centerPoint.stateValues.xs[1].tree).eq(4);
        expect(radiusNumber.stateValues.value.tree).eq(1);
      })


      cy.log("change radius")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        components['/_point2'].movePoint({ x: 5, y: 0 });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 2, 4]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([2, 4]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(5);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(5);
        expect(circle2.stateValues.center.tree).eqls(["vector", 2, 4]);
        expect(circle2.stateValues.numericalCenter).eqls([2, 4]);
        expect(circle2.stateValues.radius.tree).eq(5);
        expect(circle2.stateValues.numericalRadius).eq(5);
        expect(circle3.stateValues.center.tree).eqls(["vector", 2, 4]);
        expect(circle3.stateValues.numericalCenter).eqls([2, 4]);
        expect(circle3.stateValues.radius.tree).eq(5);
        expect(circle3.stateValues.numericalRadius).eq(5);
        expect(components['/_point1'].stateValues.xs[0].tree).eq(2);
        expect(components['/_point1'].stateValues.xs[1].tree).eq(4);
        expect(centerPoint.stateValues.xs[0].tree).eq(2);
        expect(centerPoint.stateValues.xs[1].tree).eq(4);
        expect(radiusNumber.stateValues.value.tree).eq(5);
      })

      cy.log("change center via defining point")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        components['/_point1'].movePoint({ x: -6, y: -2 });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", -6, -2]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([-6, -2]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(5);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(5);
        expect(circle2.stateValues.center.tree).eqls(["vector", -6, -2]);
        expect(circle2.stateValues.numericalCenter).eqls([-6, -2]);
        expect(circle2.stateValues.radius.tree).eq(5);
        expect(circle2.stateValues.numericalRadius).eq(5);
        expect(circle3.stateValues.center.tree).eqls(["vector", -6, -2]);
        expect(circle3.stateValues.numericalCenter).eqls([-6, -2]);
        expect(circle3.stateValues.radius.tree).eq(5);
        expect(circle3.stateValues.numericalRadius).eq(5);
        expect(components['/_point1'].stateValues.xs[0].tree).eq(-6);
        expect(components['/_point1'].stateValues.xs[1].tree).eq(-2);
        expect(centerPoint.stateValues.xs[0].tree).eq(-6);
        expect(centerPoint.stateValues.xs[1].tree).eq(-2);
        expect(radiusNumber.stateValues.value.tree).eq(5);
      })


      cy.log("change center via reffed point")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        centerPoint.movePoint({ x: -7, y: 8 });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", -7, 8]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([-7, 8]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(5);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(5);
        expect(circle2.stateValues.center.tree).eqls(["vector", -7, 8]);
        expect(circle2.stateValues.numericalCenter).eqls([-7, 8]);
        expect(circle2.stateValues.radius.tree).eq(5);
        expect(circle2.stateValues.numericalRadius).eq(5);
        expect(circle3.stateValues.center.tree).eqls(["vector", -7, 8]);
        expect(circle3.stateValues.numericalCenter).eqls([-7, 8]);
        expect(circle3.stateValues.radius.tree).eq(5);
        expect(circle3.stateValues.numericalRadius).eq(5);
        expect(components['/_point1'].stateValues.xs[0].tree).eq(-7);
        expect(components['/_point1'].stateValues.xs[1].tree).eq(8);
        expect(centerPoint.stateValues.xs[0].tree).eq(-7);
        expect(centerPoint.stateValues.xs[1].tree).eq(8);
        expect(radiusNumber.stateValues.value.tree).eq(5);
      })


      cy.log("move circle2")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        circle2.moveCircle({ center: [9, -10] });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 9, -10]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([9, -10]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(5);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(5);
        expect(circle2.stateValues.center.tree).eqls(["vector", 9, -10]);
        expect(circle2.stateValues.numericalCenter).eqls([9, -10]);
        expect(circle2.stateValues.radius.tree).eq(5);
        expect(circle2.stateValues.numericalRadius).eq(5);
        expect(circle3.stateValues.center.tree).eqls(["vector", 9, -10]);
        expect(circle3.stateValues.numericalCenter).eqls([9, -10]);
        expect(circle3.stateValues.radius.tree).eq(5);
        expect(circle3.stateValues.numericalRadius).eq(5);
        expect(components['/_point1'].stateValues.xs[0].tree).eq(9);
        expect(components['/_point1'].stateValues.xs[1].tree).eq(-10);
        expect(centerPoint.stateValues.xs[0].tree).eq(9);
        expect(centerPoint.stateValues.xs[1].tree).eq(-10);
        expect(radiusNumber.stateValues.value.tree).eq(5);
      })


      cy.log("move circle3")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        circle3.moveCircle({ center: [-3, -4] });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", -3, -4]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([-3, -4]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(5);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(5);
        expect(circle2.stateValues.center.tree).eqls(["vector", -3, -4]);
        expect(circle2.stateValues.numericalCenter).eqls([-3, -4]);
        expect(circle2.stateValues.radius.tree).eq(5);
        expect(circle2.stateValues.numericalRadius).eq(5);
        expect(circle3.stateValues.center.tree).eqls(["vector", -3, -4]);
        expect(circle3.stateValues.numericalCenter).eqls([-3, -4]);
        expect(circle3.stateValues.radius.tree).eq(5);
        expect(circle3.stateValues.numericalRadius).eq(5);
        expect(components['/_point1'].stateValues.xs[0].tree).eq(-3);
        expect(components['/_point1'].stateValues.xs[1].tree).eq(-4);
        expect(centerPoint.stateValues.xs[0].tree).eq(-3);
        expect(centerPoint.stateValues.xs[1].tree).eq(-4);
        expect(radiusNumber.stateValues.value.tree).eq(5);
      })
    })
  });

  it('circle with radius', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <graph>
    <point>(2,0)</point>
    <circle><radius><copy prop="x" tname="_point1" /></radius></circle>
    </graph>
    <graph>
    <copy prop="center" name="centerPoint" tname="_circle1" />
    <point>(<copy prop="radius" tname="_circle1" />, 0)</point>
    </graph>
    <copy prop="radius" name="radiusNumber" tname="_circle1" />
    <graph name="graph3">
      <copy name="circle2" tname="_circle1" />
    </graph>
    <copy name="graph4" tname="graph3" />
    `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a')// to wait for page to load

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);

      let centerPoint = components["/centerPoint"].replacements[0]
      let radiusNumber = components["/radiusNumber"].replacements[0]
      let circle2 = components["/circle2"].replacements[0];
      let circle3 = components["/graph4"].replacements[0].activeChildren[0];

      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let x = 0, y = 0, r = 2;
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", x, y]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([x, y]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(r);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(r);
        expect(circle2.stateValues.center.tree).eqls(["vector", x, y]);
        expect(circle2.stateValues.numericalCenter).eqls([x, y]);
        expect(circle2.stateValues.radius.tree).eq(r);
        expect(circle2.stateValues.numericalRadius).eq(r);
        expect(circle3.stateValues.center.tree).eqls(["vector", x, y]);
        expect(circle3.stateValues.numericalCenter).eqls([x, y]);
        expect(circle3.stateValues.radius.tree).eq(r);
        expect(circle3.stateValues.numericalRadius).eq(r);
        expect(components['/_point1'].stateValues.xs[0].tree).eq(r);
        expect(components['/_point1'].stateValues.xs[1].tree).eq(0);
        expect(centerPoint.stateValues.xs[0].tree).eq(x);
        expect(centerPoint.stateValues.xs[1].tree).eq(y);
        expect(radiusNumber.stateValues.value.tree).eq(r);
      })

      cy.log("move circle")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let x = 3, y = 4, r = 2;
        components['/_circle1'].moveCircle({ center: [x, y] });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", x, y]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([x, y]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(r);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(r);
        expect(circle2.stateValues.center.tree).eqls(["vector", x, y]);
        expect(circle2.stateValues.numericalCenter).eqls([x, y]);
        expect(circle2.stateValues.radius.tree).eq(r);
        expect(circle2.stateValues.numericalRadius).eq(r);
        expect(circle3.stateValues.center.tree).eqls(["vector", x, y]);
        expect(circle3.stateValues.numericalCenter).eqls([x, y]);
        expect(circle3.stateValues.radius.tree).eq(r);
        expect(circle3.stateValues.numericalRadius).eq(r);
        expect(components['/_point1'].stateValues.xs[0].tree).eq(r);
        expect(components['/_point1'].stateValues.xs[1].tree).eq(0);
        expect(centerPoint.stateValues.xs[0].tree).eq(x);
        expect(centerPoint.stateValues.xs[1].tree).eq(y);
        expect(radiusNumber.stateValues.value.tree).eq(r);
      })


      cy.log("change radius with defining point")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let x = 3, y = 4, r = 5;
        components['/_point1'].movePoint({ x: r, y: 0 });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", x, y]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([x, y]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(r);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(r);
        expect(circle2.stateValues.center.tree).eqls(["vector", x, y]);
        expect(circle2.stateValues.numericalCenter).eqls([x, y]);
        expect(circle2.stateValues.radius.tree).eq(r);
        expect(circle2.stateValues.numericalRadius).eq(r);
        expect(circle3.stateValues.center.tree).eqls(["vector", x, y]);
        expect(circle3.stateValues.numericalCenter).eqls([x, y]);
        expect(circle3.stateValues.radius.tree).eq(r);
        expect(circle3.stateValues.numericalRadius).eq(r);
        expect(components['/_point1'].stateValues.xs[0].tree).eq(r);
        expect(components['/_point1'].stateValues.xs[1].tree).eq(0);
        expect(centerPoint.stateValues.xs[0].tree).eq(x);
        expect(centerPoint.stateValues.xs[1].tree).eq(y);
        expect(radiusNumber.stateValues.value.tree).eq(r);
      })


      cy.log("change radius with reffed point")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let x = 3, y = 4, r = 7;
        components['/_point2'].movePoint({ x: r, y: 0 });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", x, y]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([x, y]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(r);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(r);
        expect(circle2.stateValues.center.tree).eqls(["vector", x, y]);
        expect(circle2.stateValues.numericalCenter).eqls([x, y]);
        expect(circle2.stateValues.radius.tree).eq(r);
        expect(circle2.stateValues.numericalRadius).eq(r);
        expect(circle3.stateValues.center.tree).eqls(["vector", x, y]);
        expect(circle3.stateValues.numericalCenter).eqls([x, y]);
        expect(circle3.stateValues.radius.tree).eq(r);
        expect(circle3.stateValues.numericalRadius).eq(r);
        expect(components['/_point1'].stateValues.xs[0].tree).eq(r);
        expect(components['/_point1'].stateValues.xs[1].tree).eq(0);
        expect(centerPoint.stateValues.xs[0].tree).eq(x);
        expect(centerPoint.stateValues.xs[1].tree).eq(y);
        expect(radiusNumber.stateValues.value.tree).eq(r);
      })

      cy.log("change center with reffed point")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let x = -5, y = -2, r = 7;
        centerPoint.movePoint({ x: x, y: y });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", x, y]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([x, y]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(r);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(r);
        expect(circle2.stateValues.center.tree).eqls(["vector", x, y]);
        expect(circle2.stateValues.numericalCenter).eqls([x, y]);
        expect(circle2.stateValues.radius.tree).eq(r);
        expect(circle2.stateValues.numericalRadius).eq(r);
        expect(circle3.stateValues.center.tree).eqls(["vector", x, y]);
        expect(circle3.stateValues.numericalCenter).eqls([x, y]);
        expect(circle3.stateValues.radius.tree).eq(r);
        expect(circle3.stateValues.numericalRadius).eq(r);
        expect(components['/_point1'].stateValues.xs[0].tree).eq(r);
        expect(components['/_point1'].stateValues.xs[1].tree).eq(0);
        expect(centerPoint.stateValues.xs[0].tree).eq(x);
        expect(centerPoint.stateValues.xs[1].tree).eq(y);
        expect(radiusNumber.stateValues.value.tree).eq(r);
      })

      cy.log("move circle2")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let x = 9, y = -10, r = 7;
        circle2.moveCircle({ center: [x, y] });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", x, y]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([x, y]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(r);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(r);
        expect(circle2.stateValues.center.tree).eqls(["vector", x, y]);
        expect(circle2.stateValues.numericalCenter).eqls([x, y]);
        expect(circle2.stateValues.radius.tree).eq(r);
        expect(circle2.stateValues.numericalRadius).eq(r);
        expect(circle3.stateValues.center.tree).eqls(["vector", x, y]);
        expect(circle3.stateValues.numericalCenter).eqls([x, y]);
        expect(circle3.stateValues.radius.tree).eq(r);
        expect(circle3.stateValues.numericalRadius).eq(r);
        expect(components['/_point1'].stateValues.xs[0].tree).eq(r);
        expect(components['/_point1'].stateValues.xs[1].tree).eq(0);
        expect(centerPoint.stateValues.xs[0].tree).eq(x);
        expect(centerPoint.stateValues.xs[1].tree).eq(y);
        expect(radiusNumber.stateValues.value.tree).eq(r);
      })

      cy.log("move circle3")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let x = -3, y = -4, r = 7;
        circle3.moveCircle({ center: [x, y] });
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", x, y]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([x, y]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(r);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(r);
        expect(circle2.stateValues.center.tree).eqls(["vector", x, y]);
        expect(circle2.stateValues.numericalCenter).eqls([x, y]);
        expect(circle2.stateValues.radius.tree).eq(r);
        expect(circle2.stateValues.numericalRadius).eq(r);
        expect(circle3.stateValues.center.tree).eqls(["vector", x, y]);
        expect(circle3.stateValues.numericalCenter).eqls([x, y]);
        expect(circle3.stateValues.radius.tree).eq(r);
        expect(circle3.stateValues.numericalRadius).eq(r);
        expect(components['/_point1'].stateValues.xs[0].tree).eq(r);
        expect(components['/_point1'].stateValues.xs[1].tree).eq(0);
        expect(centerPoint.stateValues.xs[0].tree).eq(x);
        expect(centerPoint.stateValues.xs[1].tree).eq(y);
        expect(radiusNumber.stateValues.value.tree).eq(r);
      })

    })

  });

  it('circle through point', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <graph>
    <point>(2,-3)</point>
    <circle><through><copy tname="_point1" /></through></circle>
    </graph>
    <graph>
    <copy prop="center" name="centerPoint" tname="_circle1" />
    <point>(<copy prop="radius" tname="_circle1" />, 0)</point>
    </graph>
    <copy prop="radius" name="radiusNumber" tname="_circle1" />
    <graph name="graph3">
      <copy name="circle2" tname="_circle1" />
    </graph>
    <copy name="graph4" tname="graph3" />
    `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a')// to wait for page to load


    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);

      let centerPoint = components["/centerPoint"].replacements[0]
      let radiusNumber = components["/radiusNumber"].replacements[0]
      let circle2 = components["/circle2"].replacements[0];
      let circle3 = components["/graph4"].replacements[0].activeChildren[0];

      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let tx = 2, ty = -3;
        let r = 1;
        let cx = tx, cy = ty - r;
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", cx, cy]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([cx, cy]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(r);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(r);
        expect(circle2.stateValues.center.tree).eqls(["vector", cx, cy]);
        expect(circle2.stateValues.numericalCenter).eqls([cx, cy]);
        expect(circle2.stateValues.radius.tree).eq(r);
        expect(circle2.stateValues.numericalRadius).eq(r);
        expect(circle3.stateValues.center.tree).eqls(["vector", cx, cy]);
        expect(circle3.stateValues.numericalCenter).eqls([cx, cy]);
        expect(circle3.stateValues.radius.tree).eq(r);
        expect(circle3.stateValues.numericalRadius).eq(r);
        expect(components['/_point1'].stateValues.xs[0].tree).eq(tx);
        expect(components['/_point1'].stateValues.xs[1].tree).eq(ty);
        expect(centerPoint.stateValues.xs[0].tree).eq(cx);
        expect(centerPoint.stateValues.xs[1].tree).eq(cy);
        expect(components['/_point2'].stateValues.xs[0].tree).eq(r);
        expect(components['/_point2'].stateValues.xs[1].tree).eq(0);
        expect(radiusNumber.stateValues.value.tree).eq(r);
      })

      cy.log("move circle")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let tx = -4, ty = 7;
        let r = 1;
        let cx = tx, cy = ty - r;
        components['/_circle1'].moveCircle({ center: [cx, cy] })
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", cx, cy]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([cx, cy]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(r);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(r);
        expect(circle2.stateValues.center.tree).eqls(["vector", cx, cy]);
        expect(circle2.stateValues.numericalCenter).eqls([cx, cy]);
        expect(circle2.stateValues.radius.tree).eq(r);
        expect(circle2.stateValues.numericalRadius).eq(r);
        expect(circle3.stateValues.center.tree).eqls(["vector", cx, cy]);
        expect(circle3.stateValues.numericalCenter).eqls([cx, cy]);
        expect(circle3.stateValues.radius.tree).eq(r);
        expect(circle3.stateValues.numericalRadius).eq(r);
        expect(components['/_point1'].stateValues.xs[0].tree).eq(tx);
        expect(components['/_point1'].stateValues.xs[1].tree).eq(ty);
        expect(centerPoint.stateValues.xs[0].tree).eq(cx);
        expect(centerPoint.stateValues.xs[1].tree).eq(cy);
        expect(components['/_point2'].stateValues.xs[0].tree).eq(r);
        expect(components['/_point2'].stateValues.xs[1].tree).eq(0);
        expect(radiusNumber.stateValues.value.tree).eq(r);
      })

      cy.log("move through point")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let tx = -5, ty = 9;
        let r = 1;
        let cx = tx, cy = ty - r;
        components['/_point1'].movePoint({ x: tx, y: ty })
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", cx, cy]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([cx, cy]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(r);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(r);
        expect(circle2.stateValues.center.tree).eqls(["vector", cx, cy]);
        expect(circle2.stateValues.numericalCenter).eqls([cx, cy]);
        expect(circle2.stateValues.radius.tree).eq(r);
        expect(circle2.stateValues.numericalRadius).eq(r);
        expect(circle3.stateValues.center.tree).eqls(["vector", cx, cy]);
        expect(circle3.stateValues.numericalCenter).eqls([cx, cy]);
        expect(circle3.stateValues.radius.tree).eq(r);
        expect(circle3.stateValues.numericalRadius).eq(r);
        expect(components['/_point1'].stateValues.xs[0].tree).eq(tx);
        expect(components['/_point1'].stateValues.xs[1].tree).eq(ty);
        expect(centerPoint.stateValues.xs[0].tree).eq(cx);
        expect(centerPoint.stateValues.xs[1].tree).eq(cy);
        expect(components['/_point2'].stateValues.xs[0].tree).eq(r);
        expect(components['/_point2'].stateValues.xs[1].tree).eq(0);
        expect(radiusNumber.stateValues.value.tree).eq(r);
      })

      cy.log("move reffed center")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let tx = 3, ty = -3;
        let r = 1;
        let cx = tx, cy = ty - r;
        centerPoint.movePoint({ x: cx, y: cy })
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", cx, cy]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([cx, cy]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(r);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(r);
        expect(circle2.stateValues.center.tree).eqls(["vector", cx, cy]);
        expect(circle2.stateValues.numericalCenter).eqls([cx, cy]);
        expect(circle2.stateValues.radius.tree).eq(r);
        expect(circle2.stateValues.numericalRadius).eq(r);
        expect(circle3.stateValues.center.tree).eqls(["vector", cx, cy]);
        expect(circle3.stateValues.numericalCenter).eqls([cx, cy]);
        expect(circle3.stateValues.radius.tree).eq(r);
        expect(circle3.stateValues.numericalRadius).eq(r);
        expect(components['/_point1'].stateValues.xs[0].tree).eq(tx);
        expect(components['/_point1'].stateValues.xs[1].tree).eq(ty);
        expect(centerPoint.stateValues.xs[0].tree).eq(cx);
        expect(centerPoint.stateValues.xs[1].tree).eq(cy);
        expect(components['/_point2'].stateValues.xs[0].tree).eq(r);
        expect(components['/_point2'].stateValues.xs[1].tree).eq(0);
        expect(radiusNumber.stateValues.value.tree).eq(r);
      })

      cy.log("change reffed radius, center moves")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let r = 3;
        let cx = 3, cy = -6;
        let tx = 3, ty = cy + r;
        components['/_point2'].movePoint({ x: r, y: 0 })
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", cx, cy]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([cx, cy]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(r);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(r);
        expect(circle2.stateValues.center.tree).eqls(["vector", cx, cy]);
        expect(circle2.stateValues.numericalCenter).eqls([cx, cy]);
        expect(circle2.stateValues.radius.tree).eq(r);
        expect(circle2.stateValues.numericalRadius).eq(r);
        expect(circle3.stateValues.center.tree).eqls(["vector", cx, cy]);
        expect(circle3.stateValues.numericalCenter).eqls([cx, cy]);
        expect(circle3.stateValues.radius.tree).eq(r);
        expect(circle3.stateValues.numericalRadius).eq(r);
        expect(components['/_point1'].stateValues.xs[0].tree).eq(tx);
        expect(components['/_point1'].stateValues.xs[1].tree).eq(ty);
        expect(centerPoint.stateValues.xs[0].tree).eq(cx);
        expect(centerPoint.stateValues.xs[1].tree).eq(cy);
        expect(components['/_point2'].stateValues.xs[0].tree).eq(r);
        expect(components['/_point2'].stateValues.xs[1].tree).eq(0);
        expect(radiusNumber.stateValues.value.tree).eq(r);
      })

      cy.log("try to make radius negative")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let rtry = -3;
        let r = 0;
        let cx = 3, cy = -3;
        let tx = 3, ty = cy + r;
        components['/_point2'].movePoint({ x: rtry, y: 0 })
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", cx, cy]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([cx, cy]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(r);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(r);
        expect(circle2.stateValues.center.tree).eqls(["vector", cx, cy]);
        expect(circle2.stateValues.numericalCenter).eqls([cx, cy]);
        expect(circle2.stateValues.radius.tree).eq(r);
        expect(circle2.stateValues.numericalRadius).eq(r);
        expect(circle3.stateValues.center.tree).eqls(["vector", cx, cy]);
        expect(circle3.stateValues.numericalCenter).eqls([cx, cy]);
        expect(circle3.stateValues.radius.tree).eq(r);
        expect(circle3.stateValues.numericalRadius).eq(r);
        expect(components['/_point1'].stateValues.xs[0].tree).eq(tx);
        expect(components['/_point1'].stateValues.xs[1].tree).eq(ty);
        expect(centerPoint.stateValues.xs[0].tree).eq(cx);
        expect(centerPoint.stateValues.xs[1].tree).eq(cy);
        expect(components['/_point2'].stateValues.xs[0].tree).eq(r);
        expect(components['/_point2'].stateValues.xs[1].tree).eq(0);
        expect(radiusNumber.stateValues.value.tree).eq(r);
      })

      cy.log("make radius positive again")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let r = 2;
        let cx = 3, cy = -5;
        let tx = 3, ty = cy + r;
        components['/_point2'].movePoint({ x: r, y: 0 })
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", cx, cy]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([cx, cy]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(r);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(r);
        expect(circle2.stateValues.center.tree).eqls(["vector", cx, cy]);
        expect(circle2.stateValues.numericalCenter).eqls([cx, cy]);
        expect(circle2.stateValues.radius.tree).eq(r);
        expect(circle2.stateValues.numericalRadius).eq(r);
        expect(circle3.stateValues.center.tree).eqls(["vector", cx, cy]);
        expect(circle3.stateValues.numericalCenter).eqls([cx, cy]);
        expect(circle3.stateValues.radius.tree).eq(r);
        expect(circle3.stateValues.numericalRadius).eq(r);
        expect(components['/_point1'].stateValues.xs[0].tree).eq(tx);
        expect(components['/_point1'].stateValues.xs[1].tree).eq(ty);
        expect(centerPoint.stateValues.xs[0].tree).eq(cx);
        expect(centerPoint.stateValues.xs[1].tree).eq(cy);
        expect(components['/_point2'].stateValues.xs[0].tree).eq(r);
        expect(components['/_point2'].stateValues.xs[1].tree).eq(0);
        expect(radiusNumber.stateValues.value.tree).eq(r);
      })


      cy.log("move circle2")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let r = 2;
        let cx = 9, cy = -10;
        let tx = 9, ty = cy + r;

        circle2.moveCircle({ center: [cx, cy] })
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", cx, cy]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([cx, cy]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(r);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(r);
        expect(circle2.stateValues.center.tree).eqls(["vector", cx, cy]);
        expect(circle2.stateValues.numericalCenter).eqls([cx, cy]);
        expect(circle2.stateValues.radius.tree).eq(r);
        expect(circle2.stateValues.numericalRadius).eq(r);
        expect(circle3.stateValues.center.tree).eqls(["vector", cx, cy]);
        expect(circle3.stateValues.numericalCenter).eqls([cx, cy]);
        expect(circle3.stateValues.radius.tree).eq(r);
        expect(circle3.stateValues.numericalRadius).eq(r);
        expect(components['/_point1'].stateValues.xs[0].tree).eq(tx);
        expect(components['/_point1'].stateValues.xs[1].tree).eq(ty);
        expect(centerPoint.stateValues.xs[0].tree).eq(cx);
        expect(centerPoint.stateValues.xs[1].tree).eq(cy);
        expect(components['/_point2'].stateValues.xs[0].tree).eq(r);
        expect(components['/_point2'].stateValues.xs[1].tree).eq(0);
        expect(radiusNumber.stateValues.value.tree).eq(r);
      })


      cy.log("move circle3")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let r = 2;
        let cx = -3, cy = -4;
        let tx = -3, ty = cy + r;
        circle3.moveCircle({ center: [cx, cy] })
        expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", cx, cy]);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([cx, cy]);
        expect(components['/_circle1'].stateValues.radius.tree).eq(r);
        expect(components['/_circle1'].stateValues.numericalRadius).eq(r);
        expect(circle2.stateValues.center.tree).eqls(["vector", cx, cy]);
        expect(circle2.stateValues.numericalCenter).eqls([cx, cy]);
        expect(circle2.stateValues.radius.tree).eq(r);
        expect(circle2.stateValues.numericalRadius).eq(r);
        expect(circle3.stateValues.center.tree).eqls(["vector", cx, cy]);
        expect(circle3.stateValues.numericalCenter).eqls([cx, cy]);
        expect(circle3.stateValues.radius.tree).eq(r);
        expect(circle3.stateValues.numericalRadius).eq(r);
        expect(components['/_point1'].stateValues.xs[0].tree).eq(tx);
        expect(components['/_point1'].stateValues.xs[1].tree).eq(ty);
        expect(centerPoint.stateValues.xs[0].tree).eq(cx);
        expect(centerPoint.stateValues.xs[1].tree).eq(cy);
        expect(components['/_point2'].stateValues.xs[0].tree).eq(r);
        expect(components['/_point2'].stateValues.xs[1].tree).eq(0);
        expect(radiusNumber.stateValues.value.tree).eq(r);
      })

    })
  });

  it('circle through two points', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <graph>
    <point>(2,-3)</point><point>(3,4)</point>
    <circle><through><copy tname="_point1" /><copy tname="_point2" /></through></circle>
    </graph>
    <graph>
    <copy prop="center" name="centerPoint" tname="_circle1" />
    <point>(<copy prop="radius" tname="_circle1" />, 0)</point>
    </graph>
    <copy prop="radius" name="radiusNumber" tname="_circle1" />
    <graph name="graph3">
      <copy name="circle2" tname="_circle1" />
    </graph>
    <copy name="graph4" tname="graph3" />
    `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a')// to wait for page to load


    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);

      let centerPoint = components["/centerPoint"].replacements[0]
      let radiusNumber = components["/radiusNumber"].replacements[0]
      let circle2 = components["/circle2"].replacements[0];
      let circle3 = components["/graph4"].replacements[0].activeChildren[0];

      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let t1x = 2, t1y = -3;
        let t2x = 3, t2y = 4;
        let r = Math.sqrt(Math.pow(t1x - t2x, 2) + Math.pow(t1y - t2y, 2)) / 2;
        let cx = (t1x + t2x) / 2, cy = (t1y + t2y) / 2;
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move circle')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let t1x = -2, t1y = 0;
        let t2x = -1, t2y = 7;
        let r = Math.sqrt(Math.pow(t1x - t2x, 2) + Math.pow(t1y - t2y, 2)) / 2;
        let cx = (t1x + t2x) / 2, cy = (t1y + t2y) / 2;
        components['/_circle1'].moveCircle({ center: [cx, cy] })
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move first through point')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let t1x = 4, t1y = -1;
        let t2x = -1, t2y = 7;
        let r = Math.sqrt(Math.pow(t1x - t2x, 2) + Math.pow(t1y - t2y, 2)) / 2;
        let cx = (t1x + t2x) / 2, cy = (t1y + t2y) / 2;
        components['/_point1'].movePoint({ x: t1x, y: t1y })
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move second through point on top of first')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let t1x = 4, t1y = -1;
        let t2x = 4, t2y = -1;
        let r = 0;
        let cx = (t1x + t2x) / 2, cy = (t1y + t2y) / 2;
        components['/_point2'].movePoint({ x: t2x, y: t2y })
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move second through point again')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let t1x = 4, t1y = -1;
        let t2x = 8, t2y = -3;
        let r = Math.sqrt(Math.pow(t1x - t2x, 2) + Math.pow(t1y - t2y, 2)) / 2;
        let cx = (t1x + t2x) / 2, cy = (t1y + t2y) / 2;
        components['/_point2'].movePoint({ x: t2x, y: t2y })
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move center')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let t1x = 4 + 2, t1y = -1 - 3;
        let t2x = 8 + 2, t2y = -3 - 3;
        let r = Math.sqrt(Math.pow(t1x - t2x, 2) + Math.pow(t1y - t2y, 2)) / 2;
        let cx = (t1x + t2x) / 2, cy = (t1y + t2y) / 2;
        centerPoint.movePoint({ x: cx, y: cy })
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move radius to half size')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let t1x = 8 + (4 + 2 - 8) / 2, t1y = -5 + (-1 - 3 + 5) / 2;
        let t2x = 8 + (8 + 2 - 8) / 2, t2y = -5 + (-3 - 3 + 5) / 2;
        let r = Math.sqrt(Math.pow(t1x - t2x, 2) + Math.pow(t1y - t2y, 2)) / 2;
        let cx = (t1x + t2x) / 2, cy = (t1y + t2y) / 2;
        components['/_point3'].movePoint({ x: r, y: 0 })
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move circle2')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let t1x = 8 + (4 + 2 - 8) / 2, t1y = -5 + (-1 - 3 + 5) / 2;
        let t2x = 8 + (8 + 2 - 8) / 2, t2y = -5 + (-3 - 3 + 5) / 2;
        let r = Math.sqrt(Math.pow(t1x - t2x, 2) + Math.pow(t1y - t2y, 2)) / 2;
        let cx = (t1x + t2x) / 2, cy = (t1y + t2y) / 2;
        let dx = 3, dy = -2;
        cx += dx;
        cy += dy;
        t1x += dx;
        t1y += dy;
        t2x += dx;
        t2y += dy;
        circle2.moveCircle({ center: [cx, cy] })
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move circle3')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let t1x = 8 + (4 + 2 - 8) / 2, t1y = -5 + (-1 - 3 + 5) / 2;
        let t2x = 8 + (8 + 2 - 8) / 2, t2y = -5 + (-3 - 3 + 5) / 2;
        let r = Math.sqrt(Math.pow(t1x - t2x, 2) + Math.pow(t1y - t2y, 2)) / 2;
        let cx = (t1x + t2x) / 2, cy = (t1y + t2y) / 2;
        let dx = -3, dy = 5;
        cx += dx;
        cy += dy;
        t1x += dx;
        t1y += dy;
        t2x += dx;
        t2y += dy;
        circle3.moveCircle({ center: [cx, cy] })
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })
    })
  });

  it('circle through two points, undefined on first pass', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <graph>
    <circle><through><copy tname="_point1" /><copy tname="_point2" /></through></circle>
    <point>(2,-3)</point><point>(3,4)</point>
    </graph>
    <graph>
    <copy prop="center" name="centerPoint" tname="_circle1" />
    <point>(<copy prop="radius" tname="_circle1" />, 0)</point>
    </graph>
    <copy prop="radius" name="radiusNumber" tname="_circle1" />
    <graph name="graph3">
      <copy name="circle2" tname="_circle1" />
    </graph>
    <copy name="graph4" tname="graph3" />
    `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a')// to wait for page to load

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);

      let centerPoint = components["/centerPoint"].replacements[0]
      let radiusNumber = components["/radiusNumber"].replacements[0]
      let circle2 = components["/circle2"].replacements[0];
      let circle3 = components["/graph4"].replacements[0].activeChildren[0];

      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let t1x = 2, t1y = -3;
        let t2x = 3, t2y = 4;
        let r = Math.sqrt(Math.pow(t1x - t2x, 2) + Math.pow(t1y - t2y, 2)) / 2;
        let cx = (t1x + t2x) / 2, cy = (t1y + t2y) / 2;
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move circle')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let t1x = -2, t1y = 0;
        let t2x = -1, t2y = 7;
        let r = Math.sqrt(Math.pow(t1x - t2x, 2) + Math.pow(t1y - t2y, 2)) / 2;
        let cx = (t1x + t2x) / 2, cy = (t1y + t2y) / 2;
        components['/_circle1'].moveCircle({ center: [cx, cy] })
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move first through point')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let t1x = 4, t1y = -1;
        let t2x = -1, t2y = 7;
        let r = Math.sqrt(Math.pow(t1x - t2x, 2) + Math.pow(t1y - t2y, 2)) / 2;
        let cx = (t1x + t2x) / 2, cy = (t1y + t2y) / 2;
        components['/_point1'].movePoint({ x: t1x, y: t1y })
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move second through point on top of first')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let t1x = 4, t1y = -1;
        let t2x = 4, t2y = -1;
        let r = Math.sqrt(Math.pow(t1x - t2x, 2) + Math.pow(t1y - t2y, 2)) / 2;
        let cx = (t1x + t2x) / 2, cy = (t1y + t2y) / 2;
        components['/_point2'].movePoint({ x: t2x, y: t2y })
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move second through point again')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let t1x = 4, t1y = -1;
        let t2x = 8, t2y = -3;
        let r = Math.sqrt(Math.pow(t1x - t2x, 2) + Math.pow(t1y - t2y, 2)) / 2;
        let cx = (t1x + t2x) / 2, cy = (t1y + t2y) / 2;
        components['/_point2'].movePoint({ x: t2x, y: t2y })
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move center')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let t1x = 4 + 2, t1y = -1 - 3;
        let t2x = 8 + 2, t2y = -3 - 3;
        let r = Math.sqrt(Math.pow(t1x - t2x, 2) + Math.pow(t1y - t2y, 2)) / 2;
        let cx = (t1x + t2x) / 2, cy = (t1y + t2y) / 2;
        centerPoint.movePoint({ x: cx, y: cy })
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move radius to half size')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let t1x = 8 + (4 + 2 - 8) / 2, t1y = -5 + (-1 - 3 + 5) / 2;
        let t2x = 8 + (8 + 2 - 8) / 2, t2y = -5 + (-3 - 3 + 5) / 2;
        let r = Math.sqrt(Math.pow(t1x - t2x, 2) + Math.pow(t1y - t2y, 2)) / 2;
        let cx = (t1x + t2x) / 2, cy = (t1y + t2y) / 2;
        components['/_point3'].movePoint({ x: r, y: 0 })
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })


      cy.log('move circle2')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let t1x = 8 + (4 + 2 - 8) / 2, t1y = -5 + (-1 - 3 + 5) / 2;
        let t2x = 8 + (8 + 2 - 8) / 2, t2y = -5 + (-3 - 3 + 5) / 2;
        let r = Math.sqrt(Math.pow(t1x - t2x, 2) + Math.pow(t1y - t2y, 2)) / 2;
        let cx = (t1x + t2x) / 2, cy = (t1y + t2y) / 2;
        let dx = 3, dy = -2;
        cx += dx;
        cy += dy;
        t1x += dx;
        t1y += dy;
        t2x += dx;
        t2y += dy;
        circle2.moveCircle({ center: [cx, cy] })

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })


      cy.log('move circle3')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let t1x = 8 + (4 + 2 - 8) / 2, t1y = -5 + (-1 - 3 + 5) / 2;
        let t2x = 8 + (8 + 2 - 8) / 2, t2y = -5 + (-3 - 3 + 5) / 2;
        let r = Math.sqrt(Math.pow(t1x - t2x, 2) + Math.pow(t1y - t2y, 2)) / 2;
        let cx = (t1x + t2x) / 2, cy = (t1y + t2y) / 2;
        let dx = -3, dy = 5;
        cx += dx;
        cy += dy;
        t1x += dx;
        t1y += dy;
        t2x += dx;
        t2y += dy;
        circle3.moveCircle({ center: [cx, cy] })
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

    })
  })

  it('circle through three points', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <graph>
    <point>(2,-3)</point><point>(3,4)</point><point>(-3,4)</point>
    <circle><through><copy tname="_point1" /><copy tname="_point2" /><copy tname="_point3" /></through></circle>
    </graph>
    <graph>
    <copy prop="center" name="centerPoint" tname="_circle1" />
    <point>(<copy prop="radius" tname="_circle1" />, 0)</point>
    </graph>
    <copy prop="radius" name="radiusNumber" tname="_circle1" />
    <graph name="graph3">
      <copy name="circle2" tname="_circle1" />
    </graph>
    <copy name="graph4" tname="graph3" />
    `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a')// to wait for page to load

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);

      let centerPoint = components["/centerPoint"].replacements[0]
      let radiusNumber = components["/radiusNumber"].replacements[0]
      let circle2 = components["/circle2"].replacements[0];
      let circle3 = components["/graph4"].replacements[0].activeChildren[0];

      let t1x = 2, t1y = -3;
      let t2x = 3, t2y = 4;
      let t3x = -3, t3y = 4;

      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        // calculate center and radius from circle itself
        let cx = components['/_circle1'].stateValues.numericalCenter[0];
        let cy = components['/_circle1'].stateValues.numericalCenter[1];
        let r = components['/_circle1'].stateValues.numericalRadius;

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);

        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);

        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t3y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move circle up and to the right')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        // calculate center and radius from circle itself
        let cx = components['/_circle1'].stateValues.numericalCenter[0];
        let cy = components['/_circle1'].stateValues.numericalCenter[1];
        let r = components['/_circle1'].stateValues.numericalRadius;

        let dx = 3, dy = 4;
        cx += dx;
        cy += dy;
        t1x += dx;
        t1y += dy;
        t2x += dx;
        t2y += dy;
        t3x += dx;
        t3y += dy;

        components['/_circle1'].moveCircle({ center: [cx, cy] })
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t3y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move first point to be in straight line')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        t1x = -3, t1y = 8;

        components['/_point1'].movePoint({ x: t1x, y: t1y })

        expect(Number.isFinite(components['/_circle1'].stateValues.numericalCenter[0])).false;
        expect(Number.isFinite(components['/_circle1'].stateValues.numericalCenter[1])).false;
        expect(Number.isFinite(components['/_circle1'].stateValues.numericalRadius)).false;
        expect(Number.isFinite(components['/_circle1'].stateValues.center.tree[0])).false;
        expect(Number.isFinite(components['/_circle1'].stateValues.center.tree[1])).false;
        expect(Number.isFinite(components['/_circle1'].stateValues.radius.tree)).false;
        expect(Number.isFinite(circle2.stateValues.numericalCenter[0])).false;
        expect(Number.isFinite(circle2.stateValues.numericalCenter[1])).false;
        expect(Number.isFinite(circle2.stateValues.numericalRadius)).false;
        expect(Number.isFinite(circle2.stateValues.center.tree[0])).false;
        expect(Number.isFinite(circle2.stateValues.center.tree[1])).false;
        expect(Number.isFinite(circle2.stateValues.radius.tree)).false;
        expect(Number.isFinite(circle3.stateValues.numericalCenter[0])).false;
        expect(Number.isFinite(circle3.stateValues.numericalCenter[1])).false;
        expect(Number.isFinite(circle3.stateValues.numericalRadius)).false;
        expect(Number.isFinite(circle3.stateValues.center.tree[0])).false;
        expect(Number.isFinite(circle3.stateValues.center.tree[1])).false;
        expect(Number.isFinite(circle3.stateValues.radius.tree)).false;

        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t3y, 1E-12);
        expect(Number.isFinite(centerPoint.stateValues.xs[0].tree)).false;
        expect(Number.isFinite(centerPoint.stateValues.xs[1].tree)).false;
        expect(Number.isFinite(radiusNumber.stateValues.value.tree)).false;
      })

      cy.log('move second point')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        t2x = -4, t2y = -2;

        components['/_point2'].movePoint({ x: t2x, y: t2y })

        // calculate center and radius from circle itself
        let cx = components['/_circle1'].stateValues.numericalCenter[0];
        let cy = components['/_circle1'].stateValues.numericalCenter[1];
        let r = components['/_circle1'].stateValues.numericalRadius;

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);


        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t3y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move third point')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        t3x = 5, t3y = 3;

        components['/_point3'].movePoint({ x: t3x, y: t3y })

        // calculate center and radius from circle itself
        let cx = components['/_circle1'].stateValues.numericalCenter[0];
        let cy = components['/_circle1'].stateValues.numericalCenter[1];
        let r = components['/_circle1'].stateValues.numericalRadius;

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);

        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t3y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move points to be identical')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        t1x = 5, t1y = 3;
        t2x = 5, t2y = 3;

        components['/_point1'].movePoint({ x: t1x, y: t1y })
        components['/_point2'].movePoint({ x: t2x, y: t2y })

        // should be a circle of radius zero
        let cx = t1x;
        let cy = t1y;
        let r = 0;

        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t3y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })


      cy.log('points 1 and 3 are identical')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        t2x = 2, t2y = -7;

        // two points should be the diameter
        let cx = (t1x + t2x) / 2;
        let cy = (t1y + t2y) / 2;
        let r = Math.sqrt(Math.pow(t2x - cx, 2) + Math.pow(t2y - cy, 2));

        components['/_point2'].movePoint({ x: t2x, y: t2y })

        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t3y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })


      cy.log('points 2 and 3 are identical')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        t3x = 2, t3y = -7;

        // two points should be the diameter
        let cx = (t1x + t2x) / 2;
        let cy = (t1y + t2y) / 2;
        let r = Math.sqrt(Math.pow(t2x - cx, 2) + Math.pow(t2y - cy, 2));

        components['/_point3'].movePoint({ x: t3x, y: t3y })

        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t3y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })


      cy.log('points 1 and 2 are identical')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        t1x = 4, t1y = 9;
        t2x = 4, t2y = 9;

        // two points should be the diameter
        let cx = (t1x + t3x) / 2;
        let cy = (t1y + t3y) / 2;
        let r = Math.sqrt(Math.pow(t2x - cx, 2) + Math.pow(t2y - cy, 2));

        components['/_point1'].movePoint({ x: t1x, y: t1y })
        components['/_point2'].movePoint({ x: t2x, y: t2y })

        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t3y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })



      cy.log('move points apart again')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        t2x = 2, t2y = -7;
        t3x = 0, t3y = -8;

        components['/_point2'].movePoint({ x: t2x, y: t2y })
        components['/_point3'].movePoint({ x: t3x, y: t3y })

        // calculate center and radius from circle itself
        let cx = components['/_circle1'].stateValues.numericalCenter[0];
        let cy = components['/_circle1'].stateValues.numericalCenter[1];
        let r = components['/_circle1'].stateValues.numericalRadius;

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t3y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })


      cy.log('move center by reffed point')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        // calculate center and radius from circle itself
        let cx = components['/_circle1'].stateValues.numericalCenter[0];
        let cy = components['/_circle1'].stateValues.numericalCenter[1];
        let r = components['/_circle1'].stateValues.numericalRadius;

        let dx = 2, dy = -3;
        cx += dx;
        cy += dy;
        t1x += dx;
        t1y += dy;
        t2x += dx;
        t2y += dy;
        t3x += dx;
        t3y += dy;

        centerPoint.movePoint({ x: cx, y: cy });
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t3y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('half radius around center')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        // calculate center and radius from circle itself
        let cx = components['/_circle1'].stateValues.numericalCenter[0];
        let cy = components['/_circle1'].stateValues.numericalCenter[1];
        let r = components['/_circle1'].stateValues.numericalRadius;

        r = r / 2;

        t1x = cx + (t1x - cx) / 2;
        t1y = cy + (t1y - cy) / 2;
        t2x = cx + (t2x - cx) / 2;
        t2y = cy + (t2y - cy) / 2;
        t3x = cx + (t3x - cx) / 2;
        t3y = cy + (t3y - cy) / 2;

        components['/_point4'].movePoint({ x: r, y: 0 });

        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t3y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })


      cy.log('move circle2')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        // calculate center and radius from circle itself
        let cx = circle2.stateValues.numericalCenter[0];
        let cy = circle2.stateValues.numericalCenter[1];
        let r = circle2.stateValues.numericalRadius;

        let dx = -5, dy = -2;
        cx += dx;
        cy += dy;
        t1x += dx;
        t1y += dy;
        t2x += dx;
        t2y += dy;
        t3x += dx;
        t3y += dy;

        circle2.moveCircle({ center: [cx, cy] })
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t3y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })


      cy.log('move circle3')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        // calculate center and radius from circle itself
        let cx = circle3.stateValues.numericalCenter[0];
        let cy = circle3.stateValues.numericalCenter[1];
        let r = circle3.stateValues.numericalRadius;

        let dx = 7, dy = -3;
        cx += dx;
        cy += dy;
        t1x += dx;
        t1y += dy;
        t2x += dx;
        t2y += dy;
        t3x += dx;
        t3y += dy;

        circle3.moveCircle({ center: [cx, cy] })
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t3y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })



    })

  });

  it('circle through three points, undefined on first pass', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <graph>
    <circle><through><copy tname="_point1" /><copy tname="_point2" /><copy tname="_point3" /></through></circle>
    <point>(2,-3)</point><point>(3,4)</point><point>(-3,4)</point>
    </graph>
    <graph>
    <copy prop="center" name="centerPoint" tname="_circle1" />
    <point>(<copy prop="radius" tname="_circle1" />, 0)</point>
    </graph>
    <copy prop="radius" name="radiusNumber" tname="_circle1" />
    <graph name="graph3">
      <copy name="circle2" tname="_circle1" />
    </graph>
    <copy name="graph4" tname="graph3" />
    `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a')// to wait for page to load

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);

      let centerPoint = components["/centerPoint"].replacements[0]
      let radiusNumber = components["/radiusNumber"].replacements[0]
      let circle2 = components["/circle2"].replacements[0];
      let circle3 = components["/graph4"].replacements[0].activeChildren[0];


      let t1x = 2, t1y = -3;
      let t2x = 3, t2y = 4;
      let t3x = -3, t3y = 4;

      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        // calculate center and radius from circle itself
        let cx = components['/_circle1'].stateValues.numericalCenter[0];
        let cy = components['/_circle1'].stateValues.numericalCenter[1];
        let r = components['/_circle1'].stateValues.numericalRadius;

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);

        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);

        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t3y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move circle up and to the right')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        // calculate center and radius from circle itself
        let cx = components['/_circle1'].stateValues.numericalCenter[0];
        let cy = components['/_circle1'].stateValues.numericalCenter[1];
        let r = components['/_circle1'].stateValues.numericalRadius;

        let dx = 3, dy = 4;
        cx += dx;
        cy += dy;
        t1x += dx;
        t1y += dy;
        t2x += dx;
        t2y += dy;
        t3x += dx;
        t3y += dy;

        components['/_circle1'].moveCircle({ center: [cx, cy] })
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t3y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move first point to be in straight line')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        t1x = -3, t1y = 8;

        components['/_point1'].movePoint({ x: t1x, y: t1y })

        expect(Number.isFinite(components['/_circle1'].stateValues.numericalCenter[0])).false;
        expect(Number.isFinite(components['/_circle1'].stateValues.numericalCenter[1])).false;
        expect(Number.isFinite(components['/_circle1'].stateValues.numericalRadius)).false;
        expect(Number.isFinite(components['/_circle1'].stateValues.center.tree[0])).false;
        expect(Number.isFinite(components['/_circle1'].stateValues.center.tree[1])).false;
        expect(Number.isFinite(components['/_circle1'].stateValues.radius.tree)).false;
        expect(Number.isFinite(circle2.stateValues.numericalCenter[0])).false;
        expect(Number.isFinite(circle2.stateValues.numericalCenter[1])).false;
        expect(Number.isFinite(circle2.stateValues.numericalRadius)).false;
        expect(Number.isFinite(circle2.stateValues.center.tree[0])).false;
        expect(Number.isFinite(circle2.stateValues.center.tree[1])).false;
        expect(Number.isFinite(circle2.stateValues.radius.tree)).false;
        expect(Number.isFinite(circle3.stateValues.numericalCenter[0])).false;
        expect(Number.isFinite(circle3.stateValues.numericalCenter[1])).false;
        expect(Number.isFinite(circle3.stateValues.numericalRadius)).false;
        expect(Number.isFinite(circle3.stateValues.center.tree[0])).false;
        expect(Number.isFinite(circle3.stateValues.center.tree[1])).false;
        expect(Number.isFinite(circle3.stateValues.radius.tree)).false;

        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t3y, 1E-12);
        expect(Number.isFinite(centerPoint.stateValues.xs[0].tree)).false;
        expect(Number.isFinite(centerPoint.stateValues.xs[1].tree)).false;
        expect(Number.isFinite(radiusNumber.stateValues.value.tree)).false;
      })

      cy.log('move second point')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        t2x = -4, t2y = -2;

        components['/_point2'].movePoint({ x: t2x, y: t2y })

        // calculate center and radius from circle itself
        let cx = components['/_circle1'].stateValues.numericalCenter[0];
        let cy = components['/_circle1'].stateValues.numericalCenter[1];
        let r = components['/_circle1'].stateValues.numericalRadius;

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);


        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t3y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move third point')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        t3x = 5, t3y = 3;

        components['/_point3'].movePoint({ x: t3x, y: t3y })

        // calculate center and radius from circle itself
        let cx = components['/_circle1'].stateValues.numericalCenter[0];
        let cy = components['/_circle1'].stateValues.numericalCenter[1];
        let r = components['/_circle1'].stateValues.numericalRadius;

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);

        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t3y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move points to be identical')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        t1x = 5, t1y = 3;
        t2x = 5, t2y = 3;

        components['/_point1'].movePoint({ x: t1x, y: t1y })
        components['/_point2'].movePoint({ x: t2x, y: t2y })

        // should be a circle of radius zero
        let cx = t1x;
        let cy = t1y;
        let r = 0;

        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t3y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })


      cy.log('points 1 and 3 are identical')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        t2x = 2, t2y = -7;

        // two points should be the diameter
        let cx = (t1x + t2x) / 2;
        let cy = (t1y + t2y) / 2;
        let r = Math.sqrt(Math.pow(t2x - cx, 2) + Math.pow(t2y - cy, 2));

        components['/_point2'].movePoint({ x: t2x, y: t2y })

        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t3y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })


      cy.log('points 2 and 3 are identical')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        t3x = 2, t3y = -7;

        // two points should be the diameter
        let cx = (t1x + t2x) / 2;
        let cy = (t1y + t2y) / 2;
        let r = Math.sqrt(Math.pow(t2x - cx, 2) + Math.pow(t2y - cy, 2));

        components['/_point3'].movePoint({ x: t3x, y: t3y })

        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t3y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })


      cy.log('points 1 and 2 are identical')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        t1x = 4, t1y = 9;
        t2x = 4, t2y = 9;

        // two points should be the diameter
        let cx = (t1x + t3x) / 2;
        let cy = (t1y + t3y) / 2;
        let r = Math.sqrt(Math.pow(t2x - cx, 2) + Math.pow(t2y - cy, 2));

        components['/_point1'].movePoint({ x: t1x, y: t1y })
        components['/_point2'].movePoint({ x: t2x, y: t2y })

        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t3y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })



      cy.log('move points apart again')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        t2x = 2, t2y = -7;
        t3x = 0, t3y = -8;

        components['/_point2'].movePoint({ x: t2x, y: t2y })
        components['/_point3'].movePoint({ x: t3x, y: t3y })

        // calculate center and radius from circle itself
        let cx = components['/_circle1'].stateValues.numericalCenter[0];
        let cy = components['/_circle1'].stateValues.numericalCenter[1];
        let r = components['/_circle1'].stateValues.numericalRadius;

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t3y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })


      cy.log('move center by reffed point')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        // calculate center and radius from circle itself
        let cx = components['/_circle1'].stateValues.numericalCenter[0];
        let cy = components['/_circle1'].stateValues.numericalCenter[1];
        let r = components['/_circle1'].stateValues.numericalRadius;

        let dx = 2, dy = -3;
        cx += dx;
        cy += dy;
        t1x += dx;
        t1y += dy;
        t2x += dx;
        t2y += dy;
        t3x += dx;
        t3y += dy;

        centerPoint.movePoint({ x: cx, y: cy });
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t3y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('half radius around center')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        // calculate center and radius from circle itself
        let cx = components['/_circle1'].stateValues.numericalCenter[0];
        let cy = components['/_circle1'].stateValues.numericalCenter[1];
        let r = components['/_circle1'].stateValues.numericalRadius;

        r = r / 2;

        t1x = cx + (t1x - cx) / 2;
        t1y = cy + (t1y - cy) / 2;
        t2x = cx + (t2x - cx) / 2;
        t2y = cy + (t2y - cy) / 2;
        t3x = cx + (t3x - cx) / 2;
        t3y = cy + (t3y - cy) / 2;

        components['/_point4'].movePoint({ x: r, y: 0 });

        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t3y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })


      cy.log('move circle2')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        // calculate center and radius from circle itself
        let cx = circle2.stateValues.numericalCenter[0];
        let cy = circle2.stateValues.numericalCenter[1];
        let r = circle2.stateValues.numericalRadius;

        let dx = -5, dy = -2;
        cx += dx;
        cy += dy;
        t1x += dx;
        t1y += dy;
        t2x += dx;
        t2y += dy;
        t3x += dx;
        t3y += dy;

        circle2.moveCircle({ center: [cx, cy] })
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t3y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })


      cy.log('move circle3')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        // calculate center and radius from circle itself
        let cx = circle3.stateValues.numericalCenter[0];
        let cy = circle3.stateValues.numericalCenter[1];
        let r = circle3.stateValues.numericalRadius;

        let dx = 7, dy = -3;
        cx += dx;
        cy += dy;
        t1x += dx;
        t1y += dy;
        t2x += dx;
        t2y += dy;
        t3x += dx;
        t3y += dy;

        circle3.moveCircle({ center: [cx, cy] })
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t3y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })


    })

  });

  it('circle with radius and through one point', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <graph>
    <point>(2,0)</point><point>(3,4)</point>

    <circle>
      <radius><copy prop="x" tname="_point1" /></radius>
      <through><copy tname="_point2" /></through>
    </circle>
    </graph>
    <graph>
    <copy prop="center" name="centerPoint" tname="_circle1" />
    <point>(<copy prop="radius" tname="_circle1" />, 0)</point>
    </graph>
    <copy prop="radius" name="radiusNumber" tname="_circle1" />
    <graph name="graph3">
      <copy name="circle2" tname="_circle1" />
    </graph>
    <copy name="graph4" tname="graph3" />
    `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a')// to wait for page to load

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);

      let centerPoint = components["/centerPoint"].replacements[0]
      let radiusNumber = components["/radiusNumber"].replacements[0]
      let circle2 = components["/circle2"].replacements[0];
      let circle3 = components["/graph4"].replacements[0].activeChildren[0];

      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let tx = 3, ty = 4;
        let r = 2;
        let cx = tx, cy = ty - r;

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(0, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(tx, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(ty, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move circle')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let tx = 1, ty = -1;
        let r = 2;
        let cx = tx, cy = ty - r;
        components['/_circle1'].moveCircle({ center: [cx, cy] });
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(0, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(tx, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(ty, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move through point')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let tx = 4, ty = 7;
        let r = 2;
        let cx = tx, cy = ty - r;
        components['/_point2'].movePoint({ x: tx, y: ty });
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(0, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(tx, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(ty, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('change definition radius')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let tx = 4, ty = 7;
        let r = 6;
        let cx = tx, cy = ty - r;
        components['/_point1'].movePoint({ x: r, y: 0 });
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(0, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(tx, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(ty, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('half reffed radius, center moves')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let cx = 4, cy = 4;
        let r = 3;
        let tx = cx, ty = cy + 3;
        components['/_point3'].movePoint({ x: r, y: 0 });
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(0, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(tx, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(ty, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move circle2')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let cx = 9, cy = -10;
        let r = 3;
        let tx = cx, ty = cy + r;
        circle2.moveCircle({ center: [cx, cy] });
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(0, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(tx, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(ty, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move circle3')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let cx = -4, cy = -3;
        let r = 3;
        let tx = cx, ty = cy + r;
        circle3.moveCircle({ center: [cx, cy] });
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(0, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(tx, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(ty, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })
    })
  });

  it('circle with radius and through two points', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <graph>
    <point>(2,0)</point><point>(3,4)</point><point>(5,6)</point>

    <circle>
      <radius><copy prop="x" tname="_point1" /></radius>
      <through><copy tname="_point2" /><copy tname="_point3" /></through>
    </circle>
    </graph>
    <graph>
    <copy prop="center" name="centerPoint" tname="_circle1" />
    <point>(<copy prop="radius" tname="_circle1" />, 0)</point>
    </graph>
    <copy prop="radius" name="radiusNumber" tname="_circle1" />
    <graph name="graph3">
      <copy name="circle2" tname="_circle1" />
    </graph>
    <copy name="graph4" tname="graph3" />
    `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a')// to wait for page to load

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);

      let centerPoint = components["/centerPoint"].replacements[0]
      let radiusNumber = components["/radiusNumber"].replacements[0]
      let circle2 = components["/circle2"].replacements[0];
      let circle3 = components["/graph4"].replacements[0].activeChildren[0];

      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let t1x = 3, t1y = 4;
        let t2x = 5, t2y = 6;
        let r = 2;

        // get center from circle itself
        let cx = components['/_circle1'].stateValues.numericalCenter[0];
        let cy = components['/_circle1'].stateValues.numericalCenter[1];

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(0, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move circle')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let t1x = 3, t1y = 4;
        let t2x = 5, t2y = 6;
        let r = 2;

        // get center from circle itself
        let cx = components['/_circle1'].stateValues.numericalCenter[0];
        let cy = components['/_circle1'].stateValues.numericalCenter[1];

        let dx = -1, dy = -3;
        cx += dx;
        cy += dy;
        t1x += dx;
        t1y += dy;
        t2x += dx;
        t2y += dy;

        components['/_circle1'].moveCircle({ center: [cx, cy] });
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(0, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move through point too far away')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let t1x = 0, t1y = -1;
        let t2x = 4, t2y = 3;
        let r = 2;

        components['/_point2'].movePoint({ x: t1x, y: t1y });

        expect(Number.isFinite(components['/_circle1'].stateValues.center.tree[1])).false;
        expect(Number.isFinite(components['/_circle1'].stateValues.center.tree[2])).false;
        expect(Number.isFinite(components['/_circle1'].stateValues.numericalCenter[0])).false;
        expect(Number.isFinite(components['/_circle1'].stateValues.numericalCenter[1])).false;
        // expect(Number.isFinite(components['/_circle1'].stateValues.radius.tree)).false;
        // expect(Number.isFinite(components['/_circle1'].stateValues.numericalRadius)).false;
        expect(Number.isFinite(circle2.stateValues.center.tree[1])).false;
        expect(Number.isFinite(circle2.stateValues.center.tree[2])).false;
        expect(Number.isFinite(circle2.stateValues.numericalCenter[0])).false;
        expect(Number.isFinite(circle2.stateValues.numericalCenter[1])).false;
        // expect(Number.isFinite(circle2.stateValues.radius.tree)).false;
        // expect(Number.isFinite(circle2.stateValues.numericalRadius)).false;
        expect(Number.isFinite(circle3.stateValues.center.tree[1])).false;
        expect(Number.isFinite(circle3.stateValues.center.tree[2])).false;
        expect(Number.isFinite(circle3.stateValues.numericalCenter[0])).false;
        expect(Number.isFinite(circle3.stateValues.numericalCenter[1])).false;
        // expect(Number.isFinite(circle3.stateValues.radius.tree)).false;
        // expect(Number.isFinite(circle3.stateValues.numericalRadius)).false;
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(0, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(Number.isFinite(centerPoint.stateValues.xs[0].tree)).false;
        expect(Number.isFinite(centerPoint.stateValues.xs[1].tree)).false;
        // expect(Number.isFinite(radiusNumber.stateValues.value.tree)).false;

      })

      cy.log('increase definition radius')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let t1x = 0, t1y = -1;
        let t2x = 4, t2y = 3;
        let r = 6;

        components['/_point1'].movePoint({ x: r, y: 0 });

        // get center from circle itself
        let cx = components['/_circle1'].stateValues.numericalCenter[0];
        let cy = components['/_circle1'].stateValues.numericalCenter[1];

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(0, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('decrease reffed and then definition radius')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let t1x = 0, t1y = -1;
        let t2x = 4, t2y = 3;
        let r = 6;

        // get center from circle itself
        let cx = components['/_circle1'].stateValues.numericalCenter[0];
        let cy = components['/_circle1'].stateValues.numericalCenter[1];

        r = r / 3;
        components['/_point4'].movePoint({ x: r, y: 0 });

        expect(Number.isFinite(components['/_circle1'].stateValues.center.tree[1])).false;
        expect(Number.isFinite(components['/_circle1'].stateValues.center.tree[2])).false;
        expect(Number.isFinite(components['/_circle1'].stateValues.numericalCenter[0])).false;
        expect(Number.isFinite(components['/_circle1'].stateValues.numericalCenter[1])).false;
        // expect(Number.isFinite(components['/_circle1'].stateValues.radius.tree)).false;
        // expect(Number.isFinite(components['/_circle1'].stateValues.numericalRadius)).false;
        expect(Number.isFinite(circle2.stateValues.center.tree[1])).false;
        expect(Number.isFinite(circle2.stateValues.center.tree[2])).false;
        expect(Number.isFinite(circle2.stateValues.numericalCenter[0])).false;
        expect(Number.isFinite(circle2.stateValues.numericalCenter[1])).false;
        // expect(Number.isFinite(circle2.stateValues.radius.tree)).false;
        // expect(Number.isFinite(circle2.stateValues.numericalRadius)).false;
        expect(Number.isFinite(circle3.stateValues.center.tree[1])).false;
        expect(Number.isFinite(circle3.stateValues.center.tree[2])).false;
        expect(Number.isFinite(circle3.stateValues.numericalCenter[0])).false;
        expect(Number.isFinite(circle3.stateValues.numericalCenter[1])).false;
        // expect(Number.isFinite(circle3.stateValues.radius.tree)).false;
        // expect(Number.isFinite(circle3.stateValues.numericalRadius)).false;
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(0, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(Number.isFinite(centerPoint.stateValues.xs[0].tree)).false;
        expect(Number.isFinite(centerPoint.stateValues.xs[1].tree)).false;
        // expect(Number.isFinite(radiusNumber.stateValues.value.tree)).false;

        r = r * 3;
        components['/_point4'].movePoint({ x: r, y: 0 });

        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(0, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);

        r = r / 9;
        components['/_point1'].movePoint({ x: r, y: 0 });

        expect(Number.isFinite(components['/_circle1'].stateValues.center.tree[1])).false;
        expect(Number.isFinite(components['/_circle1'].stateValues.center.tree[2])).false;
        expect(Number.isFinite(components['/_circle1'].stateValues.numericalCenter[0])).false;
        expect(Number.isFinite(components['/_circle1'].stateValues.numericalCenter[1])).false;
        // expect(Number.isFinite(components['/_circle1'].stateValues.radius.tree)).false;
        // expect(Number.isFinite(components['/_circle1'].stateValues.numericalRadius)).false;
        expect(Number.isFinite(circle2.stateValues.center.tree[1])).false;
        expect(Number.isFinite(circle2.stateValues.center.tree[2])).false;
        expect(Number.isFinite(circle2.stateValues.numericalCenter[0])).false;
        expect(Number.isFinite(circle2.stateValues.numericalCenter[1])).false;
        // expect(Number.isFinite(circle2.stateValues.radius.tree)).false;
        // expect(Number.isFinite(circle2.stateValues.numericalRadius)).false;
        expect(Number.isFinite(circle3.stateValues.center.tree[1])).false;
        expect(Number.isFinite(circle3.stateValues.center.tree[2])).false;
        expect(Number.isFinite(circle3.stateValues.numericalCenter[0])).false;
        expect(Number.isFinite(circle3.stateValues.numericalCenter[1])).false;
        // expect(Number.isFinite(circle3.stateValues.radius.tree)).false;
        // expect(Number.isFinite(circle3.stateValues.numericalRadius)).false;
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(0, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(Number.isFinite(centerPoint.stateValues.xs[0].tree)).false;
        expect(Number.isFinite(centerPoint.stateValues.xs[1].tree)).false;
        // expect(Number.isFinite(radiusNumber.stateValues.value.tree)).false;

      })

      cy.log('move through points on top of each other')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let t1x = 5, t1y = -4;
        let t2x = 5, t2y = -4;
        let r = 2 / 3;

        let cx = t1x, cy = t1y - r;

        components['/_point2'].movePoint({ x: t1x, y: t1y });
        components['/_point3'].movePoint({ x: t2x, y: t2y });

        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(0, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);

      })


      cy.log('move through points apart, but close enough')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let t1x = -2, t1y = 7;
        let t2x = -2.5, t2y = 6.6;
        let r = 2 / 3;

        components['/_point2'].movePoint({ x: t1x, y: t1y });
        components['/_point3'].movePoint({ x: t2x, y: t2y });

        // get center from circle itself
        let cx = components['/_circle1'].stateValues.numericalCenter[0];
        let cy = components['/_circle1'].stateValues.numericalCenter[1];

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(0, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);

      })

      cy.log('move reffed center')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let t1x = -2, t1y = 7;
        let t2x = -2.5, t2y = 6.6;
        let r = 2 / 3;

        // get center from circle itself
        let cx = components['/_circle1'].stateValues.numericalCenter[0];
        let cy = components['/_circle1'].stateValues.numericalCenter[1];

        let dx = 6, dy = -7;
        cx += dx;
        cy += dy;
        t1x += dx;
        t1y += dy;
        t2x += dx;
        t2y += dy;

        centerPoint.movePoint({ x: cx, y: cy });

        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(0, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);

      })


      cy.log('move circle2')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let t1x = 4, t1y = 0;
        let t2x = 3.5, t2y = -0.4;
        let r = 2 / 3;

        // get center from circle itself
        let cx = circle2.stateValues.numericalCenter[0];
        let cy = circle2.stateValues.numericalCenter[1];

        let dx = 3, dy = -1;
        cx += dx;
        cy += dy;
        t1x += dx;
        t1y += dy;
        t2x += dx;
        t2y += dy;

        circle2.moveCircle({ center: [cx, cy] });

        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(0, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);

      })


      cy.log('move circle3')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let t1x = 7, t1y = -1;
        let t2x = 6.5, t2y = -1.4;
        let r = 2 / 3;

        // get center from circle itself
        let cx = circle3.stateValues.numericalCenter[0];
        let cy = circle3.stateValues.numericalCenter[1];

        let dx = -5, dy = 3;
        cx += dx;
        cy += dy;
        t1x += dx;
        t1y += dy;
        t2x += dx;
        t2y += dy;

        circle3.moveCircle({ center: [cx, cy] });

        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(0, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);

      })



    })
  })

  it('circle with point sugared as center and through point', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <graph>
    <point>(3,4)</point><point>(5,6)</point>

    <circle>
      <copy tname="_point1" />
      <through><copy tname="_point2" /></through>
    </circle>
    </graph>
    <graph>
    <copy prop="center" name="centerPoint" tname="_circle1" />
    <point>(<copy prop="radius" tname="_circle1" />, 0)</point>
    </graph>
    <copy prop="radius" name="radiusNumber" tname="_circle1" />
    <graph name="graph3">
      <copy name="circle2" tname="_circle1" />
    </graph>
    <copy name="graph4" tname="graph3" />
    `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a')// to wait for page to load

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);

      let centerPoint = components["/centerPoint"].replacements[0]
      let radiusNumber = components["/radiusNumber"].replacements[0]
      let circle2 = components["/circle2"].replacements[0];
      let circle3 = components["/graph4"].replacements[0].activeChildren[0];

      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let cx = 3, cy = 4;
        let tx = 5, ty = 6;
        let r = Math.sqrt(Math.pow(tx - cx, 2) + Math.pow(ty - cy, 2));

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(tx, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(ty, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move circle')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let cx = 3, cy = 4;
        let tx = 5, ty = 6;
        let r = Math.sqrt(Math.pow(tx - cx, 2) + Math.pow(ty - cy, 2));

        let dx = -2, dy = -6;
        cx += dx;
        cy += dy;
        tx += dx;
        ty += dy;

        components['/_circle1'].moveCircle({ center: [cx, cy] })

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(tx, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(ty, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move defining center')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let cx = 1, cy = -2;
        let tx = 3, ty = 0;

        cx = -5;
        cy = 5;

        let r = Math.sqrt(Math.pow(tx - cx, 2) + Math.pow(ty - cy, 2));

        components['/_point1'].movePoint({ x: cx, y: cy });

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(tx, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(ty, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move reffed center')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let cx = 1, cy = -1;
        let tx = 3, ty = 0;

        centerPoint.movePoint({ x: cx, y: cy });
        let r = Math.sqrt(Math.pow(tx - cx, 2) + Math.pow(ty - cy, 2));

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(tx, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(ty, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })


      cy.log('move through point')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let cx = 1, cy = -1;
        let tx = -4, ty = 3;

        let r = Math.sqrt(Math.pow(tx - cx, 2) + Math.pow(ty - cy, 2));

        components['/_point2'].movePoint({ x: tx, y: ty });

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(tx, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(ty, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('change reffed radius')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let cx = 1, cy = -1;
        let tx = -4, ty = 3;

        let r = Math.sqrt(Math.pow(tx - cx, 2) + Math.pow(ty - cy, 2));

        r = r / 4;

        tx = cx + (tx - cx) / 4;
        ty = cy + (ty - cy) / 4;

        components['/_point3'].movePoint({ x: r, y: 0 });

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(tx, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(ty, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })


      cy.log('move circle2')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let cx = 1, cy = -1;
        let tx = -4, ty = 3;

        let r = Math.sqrt(Math.pow(tx - cx, 2) + Math.pow(ty - cy, 2));

        r = r / 4;

        tx = cx + (tx - cx) / 4;
        ty = cy + (ty - cy) / 4;

        let dx = 4, dy = -1;

        cx += dx;
        cy += dy;
        tx += dx;
        ty += dy;


        circle2.moveCircle({ center: [cx, cy] })

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(tx, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(ty, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })


      cy.log('move circle3')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let cx = 1, cy = -1;
        let tx = -4, ty = 3;

        let r = Math.sqrt(Math.pow(tx - cx, 2) + Math.pow(ty - cy, 2));

        r = r / 4;

        tx = cx + (tx - cx) / 4;
        ty = cy + (ty - cy) / 4;

        let dx = -5, dy = 4;

        cx += dx;
        cy += dy;
        tx += dx;
        ty += dy;


        circle3.moveCircle({ center: [cx, cy] })

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(tx, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(ty, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

    })
  })

  it('circle with radius and string sugared as center', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <graph>
    <point>(3,0)</point>

    <circle>
      <radius><copy prop="x" tname="_point1" /></radius>
      (-3,5)
    </circle>
    </graph>
    <graph>
    <copy prop="center" name="centerPoint" tname="_circle1" />
    <point>(<copy prop="radius" tname="_circle1" />, 0)</point>
    </graph>
    <copy prop="radius" name="radiusNumber" tname="_circle1" />
    <graph name="graph3">
      <copy name="circle2" tname="_circle1" />
    </graph>
    <copy name="graph4" tname="graph3" />
    `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a')// to wait for page to load

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);

      let definingCenter = components["/_circle1"].activeChildren[1];
      let centerPoint = components["/centerPoint"].replacements[0]
      let radiusNumber = components["/radiusNumber"].replacements[0]
      let circle2 = components["/circle2"].replacements[0];
      let circle3 = components["/graph4"].replacements[0].activeChildren[0];

      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let cx = -3, cy = 5;
        let r = 3;

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(0, 1E-12);
        expect(definingCenter.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(definingCenter.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('make defined radius negative')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let cx = -3, cy = 5;
        let r = -3;

        components['/_point1'].movePoint({ x: r, y: 0 });

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(0, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(0, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(0, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(0, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(0, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(0, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(0, 1E-12);
        expect(definingCenter.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(definingCenter.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(0, 1E-12);
      })

      cy.log('making reffed radius negative sets it to zero')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let cx = -3, cy = 5;
        let r = 0;

        components['/_point1'].movePoint({ x: 1, y: 0 });

        components['/_point2'].movePoint({ x: -5, y: 0 });

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circle3.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle3.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle3.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle3.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(0, 1E-12);
        expect(definingCenter.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(definingCenter.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })
    })

  })

  it('point constrained to circle', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <point>(3,0)</point><point>(-1,7)</point>
    <graph>
    <circle>
      <radius><copy prop="x" tname="_point1" /></radius>
      <center><copy tname="_point2" /></center>
    </circle>
    <point>(-4,-6)
      <constrainTo><copy tname="_circle1" /></constrainTo>
    </point>
    </graph>
    <graph>
    <copy prop="center" name="centerPoint" tname="_circle1" />
    <point>(<copy prop="radius" tname="_circle1" />, 0)</point>
    </graph>
    <copy prop="radius" name="radiusNumber" tname="_circle1" />
    <copy name="graph2" tname="_graph1" />
    `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a')// to wait for page to load

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);

      let centerPoint = components["/centerPoint"].replacements[0]
      let radiusNumber = components["/radiusNumber"].replacements[0]
      let circleShadow = components["/graph2"].replacements[0].activeChildren[0];
      let pointShadow = components["/graph2"].replacements[0].activeChildren[1];

      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let cx = -1, cy = 7;
        let r = 3;

        let px = components['/_point3'].stateValues.xs[0].tree;
        let py = components['/_point3'].stateValues.xs[1].tree;
        let dist = Math.sqrt(Math.pow(px - cx, 2) + Math.pow(py - cy, 2));
        expect(dist).closeTo(r, 1E-12);
        expect(pointShadow.stateValues.xs[0].tree).eq(px);
        expect(pointShadow.stateValues.xs[1].tree).eq(py);

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circleShadow.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circleShadow.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circleShadow.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circleShadow.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circleShadow.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circleShadow.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(0, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move circle')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let cx = 5, cy = -2;
        let r = 3;

        components['/_point2'].movePoint({ x: cx, y: cy });

        let px = components['/_point3'].stateValues.xs[0].tree;
        let py = components['/_point3'].stateValues.xs[1].tree;
        let dist = Math.sqrt(Math.pow(px - cx, 2) + Math.pow(py - cy, 2));
        expect(dist).closeTo(r, 1E-12);
        expect(pointShadow.stateValues.xs[0].tree).eq(px);
        expect(pointShadow.stateValues.xs[1].tree).eq(py);

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circleShadow.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circleShadow.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circleShadow.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circleShadow.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circleShadow.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circleShadow.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(0, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('shink circle')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let cx = 5, cy = -2;
        let r = 1;

        components['/_point1'].movePoint({ x: r, y: 0 });

        let px = components['/_point3'].stateValues.xs[0].tree;
        let py = components['/_point3'].stateValues.xs[1].tree;
        let dist = Math.sqrt(Math.pow(px - cx, 2) + Math.pow(py - cy, 2));
        expect(dist).closeTo(r, 1E-12);
        expect(pointShadow.stateValues.xs[0].tree).eq(px);
        expect(pointShadow.stateValues.xs[1].tree).eq(py);

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circleShadow.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circleShadow.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circleShadow.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circleShadow.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circleShadow.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circleShadow.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(0, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })

      cy.log('move point')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let cx = 5, cy = -2;
        let r = 1;

        components['/_point3'].movePoint({ x: -9, y: 8 });

        let px = components['/_point3'].stateValues.xs[0].tree;
        let py = components['/_point3'].stateValues.xs[1].tree;
        let dist = Math.sqrt(Math.pow(px - cx, 2) + Math.pow(py - cy, 2));
        expect(dist).closeTo(r, 1E-12);
        expect(pointShadow.stateValues.xs[0].tree).eq(px);
        expect(pointShadow.stateValues.xs[1].tree).eq(py);

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circleShadow.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circleShadow.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circleShadow.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circleShadow.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circleShadow.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circleShadow.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(0, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })


      cy.log('move circle shadow')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let cx = -3, cy = 7;
        let r = 1;

        circleShadow.moveCircle({ center: [cx, cy] });

        let px = components['/_point3'].stateValues.xs[0].tree;
        let py = components['/_point3'].stateValues.xs[1].tree;
        let dist = Math.sqrt(Math.pow(px - cx, 2) + Math.pow(py - cy, 2));
        expect(dist).closeTo(r, 1E-12);
        expect(pointShadow.stateValues.xs[0].tree).eq(px);
        expect(pointShadow.stateValues.xs[1].tree).eq(py);

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circleShadow.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circleShadow.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circleShadow.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circleShadow.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circleShadow.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circleShadow.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(0, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })


      cy.log('move point shadow')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let cx = -3, cy = 7;
        let r = 1;

        pointShadow.movePoint({ x: 11, y: -21 });

        let px = components['/_point3'].stateValues.xs[0].tree;
        let py = components['/_point3'].stateValues.xs[1].tree;
        let dist = Math.sqrt(Math.pow(px - cx, 2) + Math.pow(py - cy, 2));
        expect(dist).closeTo(r, 1E-12);
        expect(pointShadow.stateValues.xs[0].tree).eq(px);
        expect(pointShadow.stateValues.xs[1].tree).eq(py);

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(circleShadow.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circleShadow.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circleShadow.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circleShadow.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circleShadow.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circleShadow.stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(0, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(radiusNumber.stateValues.value.tree).closeTo(r, 1E-12);
      })


    })

  })

  it('all updatable with refs', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <graph>
    <point>(3,0)</point><point>(-1,7)</point>
    <circle>
      <center><copy tname="_point1" /></center>
      <through><copy tname="_point2" /></through>
    </circle>
    </graph>
    <graph>
    <copy prop="center" name="centerPoint" tname="_circle1" />
    <point>(<copy prop="y" tname="centerPoint" />, <copy prop="radius" tname="_circle1" />)</point>
    <copy name="circle2" tname="_circle1" />
    </graph>
    `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a')// to wait for page to load

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);

      let centerPoint = components["/centerPoint"].replacements[0]
      let circle2 = components["/circle2"].replacements[0];

      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let cx = 3, cy = 0;
        let tx = -1, ty = 7;
        let r = Math.sqrt(Math.pow(tx - cx, 2) + Math.pow(ty - cy, 2));

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(tx, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(ty, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(cy, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);

      })

      cy.log("move circle 1")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let cx = 3, cy = 0;
        let tx = -1, ty = 7;
        let r = Math.sqrt(Math.pow(tx - cx, 2) + Math.pow(ty - cy, 2));

        let dx = -5, dy = 4;
        cx += dx;
        cy += dy;
        tx += dx;
        ty += dy;

        components['/_circle1'].moveCircle({ center: [cx, cy] });

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(tx, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(ty, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(cy, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);

      })

      cy.log("move circle 2")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let cx = 3, cy = 0;
        let tx = -1, ty = 7;
        let r = Math.sqrt(Math.pow(tx - cx, 2) + Math.pow(ty - cy, 2));

        let dx = 3, dy = -2;
        cx += dx;
        cy += dy;
        tx += dx;
        ty += dy;

        circle2.moveCircle({ center: [cx, cy] });

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(tx, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(ty, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(cy, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);

      })

      cy.log("move reffed center")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let cx = 6, cy = -2;
        let tx = 2, ty = 5;

        let dx = -5, dy = -5;
        cx += dx;
        cy += dy;

        let r = Math.sqrt(Math.pow(tx - cx, 2) + Math.pow(ty - cy, 2));

        centerPoint.movePoint({ x: cx, y: cy });

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(tx, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(ty, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(cy, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);

      })

      cy.log("move defining center")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let tx = 2, ty = 5;

        let cx = -3;
        let cy = 1;

        let r = Math.sqrt(Math.pow(tx - cx, 2) + Math.pow(ty - cy, 2));

        components['/_point1'].movePoint({ x: cx, y: cy });

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(tx, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(ty, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(cy, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);

      })

      cy.log("move through point")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let cx = -3, cy = 1;

        let tx = 0;
        let ty = 4;

        let r = Math.sqrt(Math.pow(tx - cx, 2) + Math.pow(ty - cy, 2));

        components['/_point2'].movePoint({ x: tx, y: ty });

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(r, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(tx, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(ty, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(cy, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(r, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(r, 1E-12);

      })

      // This test captures the actual behavior with this strange construction
      // Question: is this the desired behavior?
      // Not sure how to improve behavior in a way that wouldn't depend
      // on the order of which is updated first:
      // the x or y coordinate of the point moved
      cy.log("move point of refs")
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let cx = -3, cy = 1;
        let tx = 0, ty = 4;

        let theta = Math.atan2(ty - cy, tx - cx);

        let rSpecified = 2;
        tx = cx + rSpecified * Math.cos(theta);
        ty = cy + rSpecified * Math.sin(theta);

        cy = -3;

        // first time through, the radius doesn't end up being what specified
        let rActual = Math.sqrt(Math.pow(tx - cx, 2) + Math.pow(ty - cy, 2))

        components['/_point3'].movePoint({ x: cy, y: rSpecified });

        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(rActual, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(rActual, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(tx, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(ty, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(cy, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(rActual, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(rActual, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(rActual, 1E-12);


        // try it again
        // since center doesn't move, we get radius specified
        theta = Math.atan2(ty - cy, tx - cx);
        tx = cx + rSpecified * Math.cos(theta);
        ty = cy + rSpecified * Math.sin(theta);
        rActual = rSpecified;

        components['/_point3'].movePoint({ x: cy, y: rSpecified });


        expect(components['/_circle1'].stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(rActual, 1E-12);
        expect(components['/_circle1'].stateValues.numericalRadius).closeTo(rActual, 1E-12);
        expect(components['/_point1'].stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(components['/_point1'].stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(components['/_point2'].stateValues.xs[0].tree).closeTo(tx, 1E-12);
        expect(components['/_point2'].stateValues.xs[1].tree).closeTo(ty, 1E-12);
        expect(centerPoint.stateValues.xs[0].tree).closeTo(cx, 1E-12);
        expect(centerPoint.stateValues.xs[1].tree).closeTo(cy, 1E-12);
        expect(components['/_point3'].stateValues.xs[0].tree).closeTo(cy, 1E-12);
        expect(components['/_point3'].stateValues.xs[1].tree).closeTo(rActual, 1E-12);
        expect(circle2.stateValues.center.tree[1]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.center.tree[2]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.numericalCenter[0]).closeTo(cx, 1E-12);
        expect(circle2.stateValues.numericalCenter[1]).closeTo(cy, 1E-12);
        expect(circle2.stateValues.radius.tree).closeTo(rActual, 1E-12);
        expect(circle2.stateValues.numericalRadius).closeTo(rActual, 1E-12);



      })
    })

  })

  it('triangle inscribed in circle, ref center coordinates separately and radius', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <graph>
    <triangle layer="1" name="t">(1,2),(3,5),(-5,2)</triangle>
  
    <circle name="c">
      <through>
        <copy prop="vertex1" tname="t" />
        <copy prop="vertex2" tname="t" />
        <copy prop="vertex3" tname="t" />
      </through>
    </circle>
  
    <point name="x">
      <x><extract prop="x"><copy prop="center" tname="c" /></extract></x>
      <y fixed>0</y>
    </point>
  
    <point name="y">
      <x fixed>0</x>
      <y><extract prop="y"><copy prop="center" tname="c" /></extract></y>
    </point>
    <point name="r">(<copy prop="radius" tname="c" />,5)</point>
  
    </graph>
    `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a')// to wait for page to load

    let t1x = 1, t1y = 2, t2x = 3, t2y = 5, t3x = -5, t3y = 2;
    let circy, circx, r;

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);

      // calculate center and radius from circle itself
      circx = components['/c'].stateValues.numericalCenter[0];
      circy = components['/c'].stateValues.numericalCenter[1];
      r = components['/c'].stateValues.numericalRadius;

      // verify triangle vertices are on circle
      expect(Math.sqrt((t1x - circx) ** 2 + (t1y - circy) ** 2)).closeTo(r, 1E-12);
      expect(Math.sqrt((t2x - circx) ** 2 + (t2y - circy) ** 2)).closeTo(r, 1E-12);
      expect(Math.sqrt((t3x - circx) ** 2 + (t3y - circy) ** 2)).closeTo(r, 1E-12);

      expect(components['/t'].stateValues.vertices[0].tree[1]).closeTo(t1x, 1E-12);
      expect(components['/t'].stateValues.vertices[0].tree[2]).closeTo(t1y, 1E-12);
      expect(components['/t'].stateValues.vertices[1].tree[1]).closeTo(t2x, 1E-12);
      expect(components['/t'].stateValues.vertices[1].tree[2]).closeTo(t2y, 1E-12);
      expect(components['/t'].stateValues.vertices[2].tree[1]).closeTo(t3x, 1E-12);
      expect(components['/t'].stateValues.vertices[2].tree[2]).closeTo(t3y, 1E-12);
      expect(components['/c'].stateValues.center.tree[1]).closeTo(circx, 1E-12);
      expect(components['/c'].stateValues.center.tree[2]).closeTo(circy, 1E-12);
      expect(components['/c'].stateValues.radius.tree).closeTo(r, 1E-12);
      expect(components['/x'].stateValues.xs[0].tree).closeTo(circx, 1E-12);
      expect(components['/y'].stateValues.xs[1].tree).closeTo(circy, 1E-12);
      expect(components['/r'].stateValues.xs[0].tree).closeTo(r, 1E-12);

    })

    cy.log("move triangle points")
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      t1x = -3, t1y = 1, t2x = 4, t2y = 0, t3x = -1, t3y = 7;

      components['/t'].movePolygon([
        [t1x, t1y], [t2x, t2y], [t3x, t3y]
      ])

      // calculate center and radius from circle itself
      circx = components['/c'].stateValues.numericalCenter[0];
      circy = components['/c'].stateValues.numericalCenter[1];
      r = components['/c'].stateValues.numericalRadius;

      // verify triangle vertices are on circle
      expect(Math.sqrt((t1x - circx) ** 2 + (t1y - circy) ** 2)).closeTo(r, 1E-12);
      expect(Math.sqrt((t2x - circx) ** 2 + (t2y - circy) ** 2)).closeTo(r, 1E-12);
      expect(Math.sqrt((t3x - circx) ** 2 + (t3y - circy) ** 2)).closeTo(r, 1E-12);

      expect(components['/t'].stateValues.vertices[0].tree[1]).closeTo(t1x, 1E-12);
      expect(components['/t'].stateValues.vertices[0].tree[2]).closeTo(t1y, 1E-12);
      expect(components['/t'].stateValues.vertices[1].tree[1]).closeTo(t2x, 1E-12);
      expect(components['/t'].stateValues.vertices[1].tree[2]).closeTo(t2y, 1E-12);
      expect(components['/t'].stateValues.vertices[2].tree[1]).closeTo(t3x, 1E-12);
      expect(components['/t'].stateValues.vertices[2].tree[2]).closeTo(t3y, 1E-12);
      expect(components['/c'].stateValues.center.tree[1]).closeTo(circx, 1E-12);
      expect(components['/c'].stateValues.center.tree[2]).closeTo(circy, 1E-12);
      expect(components['/c'].stateValues.radius.tree).closeTo(r, 1E-12);
      expect(components['/x'].stateValues.xs[0].tree).closeTo(circx, 1E-12);
      expect(components['/y'].stateValues.xs[1].tree).closeTo(circy, 1E-12);
      expect(components['/r'].stateValues.xs[0].tree).closeTo(r, 1E-12);

    })

    cy.log("move circle via center")
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);

      let dx = 2, dy = -3;
      circx += dx;
      circy += dy;
      t1x += dx;
      t1y += dy;
      t2x += dx;
      t2y += dy;
      t3x += dx;
      t3y += dy;

      components['/c'].moveCircle({ center: [circx, circy] });

      expect(components['/c'].stateValues.numericalCenter[0]).closeTo(circx, 1E-12);
      expect(components['/c'].stateValues.numericalCenter[1]).closeTo(circy, 1E-12);
      expect(components['/c'].stateValues.numericalRadius).closeTo(r, 1E-12);

      expect(components['/t'].stateValues.vertices[0].tree[1]).closeTo(t1x, 1E-12);
      expect(components['/t'].stateValues.vertices[0].tree[2]).closeTo(t1y, 1E-12);
      expect(components['/t'].stateValues.vertices[1].tree[1]).closeTo(t2x, 1E-12);
      expect(components['/t'].stateValues.vertices[1].tree[2]).closeTo(t2y, 1E-12);
      expect(components['/t'].stateValues.vertices[2].tree[1]).closeTo(t3x, 1E-12);
      expect(components['/t'].stateValues.vertices[2].tree[2]).closeTo(t3y, 1E-12);
      expect(components['/c'].stateValues.center.tree[1]).closeTo(circx, 1E-12);
      expect(components['/c'].stateValues.center.tree[2]).closeTo(circy, 1E-12);
      expect(components['/c'].stateValues.radius.tree).closeTo(r, 1E-12);
      expect(components['/x'].stateValues.xs[0].tree).closeTo(circx, 1E-12);
      expect(components['/y'].stateValues.xs[1].tree).closeTo(circy, 1E-12);
      expect(components['/r'].stateValues.xs[0].tree).closeTo(r, 1E-12);

    })


    cy.log("move circle center x")
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);

      let dx = -5;
      circx += dx;
      t1x += dx;
      t2x += dx;
      t3x += dx;

      components['/x'].movePoint({ x: circx });

      expect(components['/c'].stateValues.numericalCenter[0]).closeTo(circx, 1E-12);
      expect(components['/c'].stateValues.numericalCenter[1]).closeTo(circy, 1E-12);
      expect(components['/c'].stateValues.numericalRadius).closeTo(r, 1E-12);

      expect(components['/t'].stateValues.vertices[0].tree[1]).closeTo(t1x, 1E-12);
      expect(components['/t'].stateValues.vertices[0].tree[2]).closeTo(t1y, 1E-12);
      expect(components['/t'].stateValues.vertices[1].tree[1]).closeTo(t2x, 1E-12);
      expect(components['/t'].stateValues.vertices[1].tree[2]).closeTo(t2y, 1E-12);
      expect(components['/t'].stateValues.vertices[2].tree[1]).closeTo(t3x, 1E-12);
      expect(components['/t'].stateValues.vertices[2].tree[2]).closeTo(t3y, 1E-12);
      expect(components['/c'].stateValues.center.tree[1]).closeTo(circx, 1E-12);
      expect(components['/c'].stateValues.center.tree[2]).closeTo(circy, 1E-12);
      expect(components['/c'].stateValues.radius.tree).closeTo(r, 1E-12);
      expect(components['/x'].stateValues.xs[0].tree).closeTo(circx, 1E-12);
      expect(components['/y'].stateValues.xs[1].tree).closeTo(circy, 1E-12);
      expect(components['/r'].stateValues.xs[0].tree).closeTo(r, 1E-12);

    })



    cy.log("move circle center y")
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);

      let dy = 6;
      circy += dy;
      t1y += dy;
      t2y += dy;
      t3y += dy;

      components['/y'].movePoint({ y: circy });

      expect(components['/c'].stateValues.numericalCenter[0]).closeTo(circx, 1E-12);
      expect(components['/c'].stateValues.numericalCenter[1]).closeTo(circy, 1E-12);
      expect(components['/c'].stateValues.numericalRadius).closeTo(r, 1E-12);

      expect(components['/t'].stateValues.vertices[0].tree[1]).closeTo(t1x, 1E-12);
      expect(components['/t'].stateValues.vertices[0].tree[2]).closeTo(t1y, 1E-12);
      expect(components['/t'].stateValues.vertices[1].tree[1]).closeTo(t2x, 1E-12);
      expect(components['/t'].stateValues.vertices[1].tree[2]).closeTo(t2y, 1E-12);
      expect(components['/t'].stateValues.vertices[2].tree[1]).closeTo(t3x, 1E-12);
      expect(components['/t'].stateValues.vertices[2].tree[2]).closeTo(t3y, 1E-12);
      expect(components['/c'].stateValues.center.tree[1]).closeTo(circx, 1E-12);
      expect(components['/c'].stateValues.center.tree[2]).closeTo(circy, 1E-12);
      expect(components['/c'].stateValues.radius.tree).closeTo(r, 1E-12);
      expect(components['/x'].stateValues.xs[0].tree).closeTo(circx, 1E-12);
      expect(components['/y'].stateValues.xs[1].tree).closeTo(circy, 1E-12);
      expect(components['/r'].stateValues.xs[0].tree).closeTo(r, 1E-12);

    })

    cy.log("shrink radius")
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);

      let radiusfactor = 0.4;

      r = r * radiusfactor;

      t1x = circx + (t1x - circx) * radiusfactor;
      t1y = circy + (t1y - circy) * radiusfactor;
      t2x = circx + (t2x - circx) * radiusfactor;
      t2y = circy + (t2y - circy) * radiusfactor;
      t3x = circx + (t3x - circx) * radiusfactor;
      t3y = circy + (t3y - circy) * radiusfactor;

      components['/r'].movePoint({ x: r });

      expect(components['/c'].stateValues.numericalCenter[0]).closeTo(circx, 1E-12);
      expect(components['/c'].stateValues.numericalCenter[1]).closeTo(circy, 1E-12);
      expect(components['/c'].stateValues.numericalRadius).closeTo(r, 1E-12);

      expect(components['/t'].stateValues.vertices[0].tree[1]).closeTo(t1x, 1E-12);
      expect(components['/t'].stateValues.vertices[0].tree[2]).closeTo(t1y, 1E-12);
      expect(components['/t'].stateValues.vertices[1].tree[1]).closeTo(t2x, 1E-12);
      expect(components['/t'].stateValues.vertices[1].tree[2]).closeTo(t2y, 1E-12);
      expect(components['/t'].stateValues.vertices[2].tree[1]).closeTo(t3x, 1E-12);
      expect(components['/t'].stateValues.vertices[2].tree[2]).closeTo(t3y, 1E-12);
      expect(components['/c'].stateValues.center.tree[1]).closeTo(circx, 1E-12);
      expect(components['/c'].stateValues.center.tree[2]).closeTo(circy, 1E-12);
      expect(components['/c'].stateValues.radius.tree).closeTo(r, 1E-12);
      expect(components['/x'].stateValues.xs[0].tree).closeTo(circx, 1E-12);
      expect(components['/y'].stateValues.xs[1].tree).closeTo(circy, 1E-12);
      expect(components['/r'].stateValues.xs[0].tree).closeTo(r, 1E-12);

    })

    cy.log("shrink radius to zero")
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);

      components['/r'].movePoint({ x: -3 }); // overshoot

      expect(components['/c'].stateValues.numericalCenter[0]).closeTo(circx, 1E-12);
      expect(components['/c'].stateValues.numericalCenter[1]).closeTo(circy, 1E-12);
      expect(components['/c'].stateValues.numericalRadius).closeTo(0, 1E-12);

      expect(components['/t'].stateValues.vertices[0].tree[1]).closeTo(circx, 1E-12);
      expect(components['/t'].stateValues.vertices[0].tree[2]).closeTo(circy, 1E-12);
      expect(components['/t'].stateValues.vertices[1].tree[1]).closeTo(circx, 1E-12);
      expect(components['/t'].stateValues.vertices[1].tree[2]).closeTo(circy, 1E-12);
      expect(components['/t'].stateValues.vertices[2].tree[1]).closeTo(circx, 1E-12);
      expect(components['/t'].stateValues.vertices[2].tree[2]).closeTo(circy, 1E-12);
      expect(components['/c'].stateValues.center.tree[1]).closeTo(circx, 1E-12);
      expect(components['/c'].stateValues.center.tree[2]).closeTo(circy, 1E-12);
      expect(components['/c'].stateValues.radius.tree).closeTo(0, 1E-12);
      expect(components['/x'].stateValues.xs[0].tree).closeTo(circx, 1E-12);
      expect(components['/y'].stateValues.xs[1].tree).closeTo(circy, 1E-12);
      expect(components['/r'].stateValues.xs[0].tree).closeTo(0, 1E-12);

    })

    cy.log("increase radius to 6")
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);

      let radiusfactor = 6 / r;

      r = r * radiusfactor;

      t1x = circx + (t1x - circx) * radiusfactor;
      t1y = circy + (t1y - circy) * radiusfactor;
      t2x = circx + (t2x - circx) * radiusfactor;
      t2y = circy + (t2y - circy) * radiusfactor;
      t3x = circx + (t3x - circx) * radiusfactor;
      t3y = circy + (t3y - circy) * radiusfactor;

      components['/r'].movePoint({ x: r });

      expect(components['/c'].stateValues.numericalCenter[0]).closeTo(circx, 1E-12);
      expect(components['/c'].stateValues.numericalCenter[1]).closeTo(circy, 1E-12);
      expect(components['/c'].stateValues.numericalRadius).closeTo(r, 1E-12);

      expect(components['/t'].stateValues.vertices[0].tree[1]).closeTo(t1x, 1E-12);
      expect(components['/t'].stateValues.vertices[0].tree[2]).closeTo(t1y, 1E-12);
      expect(components['/t'].stateValues.vertices[1].tree[1]).closeTo(t2x, 1E-12);
      expect(components['/t'].stateValues.vertices[1].tree[2]).closeTo(t2y, 1E-12);
      expect(components['/t'].stateValues.vertices[2].tree[1]).closeTo(t3x, 1E-12);
      expect(components['/t'].stateValues.vertices[2].tree[2]).closeTo(t3y, 1E-12);
      expect(components['/c'].stateValues.center.tree[1]).closeTo(circx, 1E-12);
      expect(components['/c'].stateValues.center.tree[2]).closeTo(circy, 1E-12);
      expect(components['/c'].stateValues.radius.tree).closeTo(r, 1E-12);
      expect(components['/x'].stateValues.xs[0].tree).closeTo(circx, 1E-12);
      expect(components['/y'].stateValues.xs[1].tree).closeTo(circy, 1E-12);
      expect(components['/r'].stateValues.xs[0].tree).closeTo(r, 1E-12);

    })



  })

  it('circle where radius depends on center', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
  <text>a</text>
  <graph>
    <circle>
      <center>(1,2)</center>
      <radius><extract prop="y"><copy prop="center" tname="_circle1" /></extract></radius>
    </circle>
    <copy prop="center" tname="_circle1" />
  </graph>
    `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a')// to wait for page to load

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 1, 2]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(2);
      expect(components['/_copy2'].replacements[0].stateValues.coords.tree).eqls(["vector", 1, 2])
    })

    cy.log("move circle");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      components['/_circle1'].moveCircle({ center: [-3, 5] });
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", -3, 5]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(5);
      expect(components['/_copy2'].replacements[0].stateValues.coords.tree).eqls(["vector", -3, 5])
    })

    cy.log("move center point");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      components['/_copy2'].replacements[0].movePoint({ x: 8, y: 7 });
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 8, 7]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(7);
      expect(components['/_copy2'].replacements[0].stateValues.coords.tree).eqls(["vector", 8, 7])
    })

    cy.log("move circle below x-axis");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      components['/_circle1'].moveCircle({ center: [3, -2] });
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 3, -2]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(0);
      expect(components['/_copy2'].replacements[0].stateValues.coords.tree).eqls(["vector", 3, -2])
    })

    cy.log("move circle back up with center point");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      components['/_copy2'].replacements[0].movePoint({ x: 1, y: 4 });
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 1, 4]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(4);
      expect(components['/_copy2'].replacements[0].stateValues.coords.tree).eqls(["vector", 1, 4])
    })

  })

  it('circle where center depends on radius', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
  <text>a</text>
  <graph>
    <circle radius="2">
      <center>(1,<copy prop="radius" tname="_circle1" />)</center>
    </circle>
    <copy prop="center" tname="_circle1" />
  </graph>
  `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a')// to wait for page to load

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 1, 2]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(2);
      expect(components['/_copy2'].replacements[0].stateValues.coords.tree).eqls(["vector", 1, 2])
    })

    cy.log("move circle");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      components['/_circle1'].moveCircle({ center: [-3, 5] });
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", -3, 5]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(5);
      expect(components['/_copy2'].replacements[0].stateValues.coords.tree).eqls(["vector", -3, 5])
    })

    cy.log("move center point");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      components['/_copy2'].replacements[0].movePoint({ x: 8, y: 7 });
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 8, 7]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(7);
      expect(components['/_copy2'].replacements[0].stateValues.coords.tree).eqls(["vector", 8, 7])
    })

    cy.log("move circle below x-axis");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      components['/_circle1'].moveCircle({ center: [3, -2] });
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 3, 0]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(0);
      expect(components['/_copy2'].replacements[0].stateValues.coords.tree).eqls(["vector", 3, 0])
    })

    cy.log("move circle back up with center point");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      components['/_copy2'].replacements[0].movePoint({ x: 1, y: 4 });
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 1, 4]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(4);
      expect(components['/_copy2'].replacements[0].stateValues.coords.tree).eqls(["vector", 1, 4])
    })

  })

  it('circle where center depends on unspecified radius', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
  <text>a</text>
  <graph>
    <circle>
      <center>(1,<copy prop="radius" tname="_circle1" />)</center>
    </circle>
    <copy prop="center" tname="_circle1" />
  </graph>
  `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a')// to wait for page to load

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 1, 1]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(1);
      expect(components['/_copy2'].replacements[0].stateValues.coords.tree).eqls(["vector", 1, 1])
    })

    cy.log("move circle");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      components['/_circle1'].moveCircle({ center: [-3, 5] });
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", -3, 5]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(5);
      expect(components['/_copy2'].replacements[0].stateValues.coords.tree).eqls(["vector", -3, 5])
    })

    cy.log("move center point");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      components['/_copy2'].replacements[0].movePoint({ x: 8, y: 7 });
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 8, 7]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(7);
      expect(components['/_copy2'].replacements[0].stateValues.coords.tree).eqls(["vector", 8, 7])
    })

    cy.log("move circle below x-axis");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      components['/_circle1'].moveCircle({ center: [3, -2] });
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 3, 0]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(0);
      expect(components['/_copy2'].replacements[0].stateValues.coords.tree).eqls(["vector", 3, 0])
    })

    cy.log("move circle back up with center point");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      components['/_copy2'].replacements[0].movePoint({ x: 1, y: 4 });
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 1, 4]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(4);
      expect(components['/_copy2'].replacements[0].stateValues.coords.tree).eqls(["vector", 1, 4])
    })

  })

  it('circle where single through point depends on radius', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
  <text>a</text>
  <graph>
    <circle radius="2">
      <through>(1,2<copy prop="radius" tname="_circle1" />)</through>
    </circle>
    <copy prop="center" tname="_circle1" />
  </graph>
  `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a')// to wait for page to load

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 1, 2]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(2);
      expect(components['/_copy2'].replacements[0].stateValues.coords.tree).eqls(["vector", 1, 2])
    })

    cy.log("move circle");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let desiredHeight = 5;
      let actualHeight = (5 + 2) / 2;
      // given previous radius is 2, would move through point to 5+2,
      // so that center of circle would be (5+2)/2
      components['/_circle1'].moveCircle({ center: [-3, desiredHeight] });

      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", -3, actualHeight]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(actualHeight);
      expect(components['/_copy2'].replacements[0].stateValues.coords.tree).eqls(["vector", -3, actualHeight])
    })

    cy.log("move center point");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let desiredHeight = 7;
      let actualHeight = (7 + 3.5) / 2;  // given previous radius is 3.5
      components['/_copy2'].replacements[0].movePoint({ x: 8, y: desiredHeight });
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 8, actualHeight]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(actualHeight);
      expect(components['/_copy2'].replacements[0].stateValues.coords.tree).eqls(["vector", 8, actualHeight])
    })

    cy.log("move circle below x-axis");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      components['/_circle1'].moveCircle({ center: [4, -6] });
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 4, 0]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(0);
      expect(components['/_copy2'].replacements[0].stateValues.coords.tree).eqls(["vector", 4, 0])
    })

    cy.log("move circle back up with center point");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let desiredHeight = 4;
      let actualHeight = (4 + 0) / 2;  // given previous radius is 0
      components['/_copy2'].replacements[0].movePoint({ x: 1, y: desiredHeight });
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 1, actualHeight]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(actualHeight);
      expect(components['/_copy2'].replacements[0].stateValues.coords.tree).eqls(["vector", 1, actualHeight])
    })

  })

  it('circle where single through point depends on unspecified radius', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
  <text>a</text>
  <graph>
    <circle>
      <through>(1,2<copy prop="radius" tname="_circle1" />)</through>
    </circle>
    <copy prop="center" tname="_circle1" />
  </graph>
  `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a')// to wait for page to load

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 1, 1]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(1);
      expect(components['/_copy2'].replacements[0].stateValues.coords.tree).eqls(["vector", 1, 1])
    })

    cy.log("move circle");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let desiredHeight = 5;
      let actualHeight = (5 + 1) / 2;
      // given previous radius is 1, would move through point to 5+1,
      // so that center of circle would be (5+1)/2
      components['/_circle1'].moveCircle({ center: [-3, desiredHeight] });

      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", -3, actualHeight]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(actualHeight);
      expect(components['/_copy2'].replacements[0].stateValues.coords.tree).eqls(["vector", -3, actualHeight])
    })

    cy.log("move center point");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let desiredHeight = 7;
      let actualHeight = (7 + 3) / 2;  // given previous radius is 3
      components['/_copy2'].replacements[0].movePoint({ x: 8, y: desiredHeight });
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 8, actualHeight]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(actualHeight);
      expect(components['/_copy2'].replacements[0].stateValues.coords.tree).eqls(["vector", 8, actualHeight])
    })

    cy.log("move circle below x-axis");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      components['/_circle1'].moveCircle({ center: [4, -6] });
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 4, 0]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(0);
      expect(components['/_copy2'].replacements[0].stateValues.coords.tree).eqls(["vector", 4, 0])
    })

    cy.log("move circle back up with center point");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let desiredHeight = 4;
      let actualHeight = (4 + 0) / 2;  // given previous radius is 0
      components['/_copy2'].replacements[0].movePoint({ x: 1, y: desiredHeight });
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 1, actualHeight]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(actualHeight);
      expect(components['/_copy2'].replacements[0].stateValues.coords.tree).eqls(["vector", 1, actualHeight])
    })

  })

  it('circle where radius depends on single through point', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
  <text>a</text>
  <graph>
    <circle>
      <radius><extract prop="y"><copy prop="throughPoint1" tname="_circle1" /></extract>/2</radius>
      <through>(1,4)</through>
    </circle>
    <copy prop="center" tname="_circle1" />
  </graph>
  `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a')// to wait for page to load

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 1, 2]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(2);
      expect(components['/_copy2'].replacements[0].stateValues.coords.tree).eqls(["vector", 1, 2])
    })

    cy.log("move circle");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let desiredHeight = 5;
      let actualHeight = (5 + 2) / 2;
      // given previous radius is 2, would move through point to 5+2,
      // so that center of circle would be (5+2)/2
      components['/_circle1'].moveCircle({ center: [-3, desiredHeight] });

      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", -3, actualHeight]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(actualHeight);
      expect(components['/_copy2'].replacements[0].stateValues.coords.tree).eqls(["vector", -3, actualHeight])
    })

    cy.log("move center point");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let desiredHeight = 7;
      let actualHeight = (7 + 3.5) / 2;  // given previous radius is 3.5
      components['/_copy2'].replacements[0].movePoint({ x: 8, y: desiredHeight });
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 8, actualHeight]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(actualHeight);
      expect(components['/_copy2'].replacements[0].stateValues.coords.tree).eqls(["vector", 8, actualHeight])
    })

    cy.log("move circle below x-axis");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let desiredHeight = -6;
      let actualHeight = -6 + 5.25
      // would move through point to -6+5.25,
      // but radius becomes zero, so center is at -6+5.25
      components['/_circle1'].moveCircle({ center: [4, desiredHeight] });
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 4, actualHeight]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(0);
      expect(components['/_copy2'].replacements[0].stateValues.coords.tree).eqls(["vector", 4, actualHeight])
    })

    cy.log("move circle back up with center point");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let desiredHeight = 4;
      let actualHeight = (4 + 0) / 2;  // given previous radius is 0
      components['/_copy2'].replacements[0].movePoint({ x: 1, y: desiredHeight });
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 1, actualHeight]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(actualHeight);
      expect(components['/_copy2'].replacements[0].stateValues.coords.tree).eqls(["vector", 1, actualHeight])
    })

  })

  it('circle where center depends on through point', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
  <text>a</text>
  <graph>
    <circle>
      <through>(1,4)</through>
      <center>
        <x><extract prop="x"><copy prop="throughPoint1" tname="_circle1" /></extract></x>
        <y><extract prop="y"><copy prop="throughPoint1" tname="_circle1" /></extract>/2</y>
      </center>
    </circle>
    <copy prop="center" tname="_circle1" />
  </graph>
  `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a')// to wait for page to load

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 1, 2]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(2);
      expect(components['/_copy3'].replacements[0].stateValues.coords.tree).eqls(["vector", 1, 2])
    })

    cy.log("move circle");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let desiredHeight = 5;
      let actualHeight = (5 + 2) / 2;
      // given previous radius is 2, would move through point to 5+2,
      // so that center of circle would be (5+2)/2
      components['/_circle1'].moveCircle({ center: [-3, desiredHeight] });

      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", -3, actualHeight]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(actualHeight);
      expect(components['/_copy3'].replacements[0].stateValues.coords.tree).eqls(["vector", -3, actualHeight])
    })

    cy.log("move center point");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let desiredHeight = 7;
      let actualHeight = 7;  // since moving center itself
      components['/_copy3'].replacements[0].movePoint({ x: 8, y: desiredHeight });
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 8, actualHeight]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(actualHeight);
      expect(components['/_copy3'].replacements[0].stateValues.coords.tree).eqls(["vector", 8, actualHeight])
    })

    cy.log("move circle below x-axis");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let desiredHeight = -8;
      let actualHeight = (-8 + 7) / 2; // given previous radius is 7
      components['/_circle1'].moveCircle({ center: [4, desiredHeight] });
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 4, actualHeight]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(-actualHeight);
      expect(components['/_copy3'].replacements[0].stateValues.coords.tree).eqls(["vector", 4, actualHeight])
    })

    cy.log("move circle back up with center point");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let desiredHeight = 4;
      let actualHeight = 4;  // since moving point itself
      components['/_copy3'].replacements[0].movePoint({ x: 1, y: desiredHeight });
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 1, actualHeight]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(actualHeight);
      expect(components['/_copy3'].replacements[0].stateValues.coords.tree).eqls(["vector", 1, actualHeight])
    })

  })

  it('circle where through point depends on center', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
  <text>a</text>
  <graph>
    <circle>
      <through>
        <point>
          <x><extract prop="x"><copy prop="center" tname="_circle1" /></extract></x>
          <y><extract prop="y"><copy prop="center" tname="_circle1" /></extract>2</y>
        </point>
      </through>
      <center>(1,2)</center>
    </circle>
    <copy prop="center" tname="_circle1" />
  </graph>
  `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a')// to wait for page to load

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 1, 2]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(2);
      expect(components['/_copy3'].replacements[0].stateValues.coords.tree).eqls(["vector", 1, 2])
    })

    cy.log("move circle");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let desiredHeight = 5;
      let actualHeight = (5 + 2) / 2;
      // given previous radius is 2, would move through point to 5+2,
      // so that center of circle would be (5+2)/2
      components['/_circle1'].moveCircle({ center: [-3, desiredHeight] });

      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", -3, actualHeight]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(actualHeight);
      expect(components['/_copy3'].replacements[0].stateValues.coords.tree).eqls(["vector", -3, actualHeight])
    })

    cy.log("move center point");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let desiredHeight = 7;
      let actualHeight = 7;  // since moving center itself
      components['/_copy3'].replacements[0].movePoint({ x: 8, y: desiredHeight });
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 8, actualHeight]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(actualHeight);
      expect(components['/_copy3'].replacements[0].stateValues.coords.tree).eqls(["vector", 8, actualHeight])
    })

    cy.log("move circle below x-axis");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let desiredHeight = -8;
      let actualHeight = (-8 + 7) / 2; // given previous radius is 7
      components['/_circle1'].moveCircle({ center: [4, desiredHeight] });
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 4, actualHeight]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(-actualHeight);
      expect(components['/_copy3'].replacements[0].stateValues.coords.tree).eqls(["vector", 4, actualHeight])
    })

    cy.log("move circle back up with center point");
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let desiredHeight = 4;
      let actualHeight = 4;  // since moving point itself
      components['/_copy3'].replacements[0].movePoint({ x: 1, y: desiredHeight });
      expect(components['/_circle1'].stateValues.center.tree).eqls(["vector", 1, actualHeight]);
      expect(components['/_circle1'].stateValues.radius.tree).eq(actualHeight);
      expect(components['/_copy3'].replacements[0].stateValues.coords.tree).eqls(["vector", 1, actualHeight])
    })

  })

  it('circle where radius depends on two through points', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
  <text>a</text>
  <graph>
    <circle>
      <through hide="false">
      (1,2),(3,4)
      </through>
      <radius>
        abs(<extract prop="x"><copy prop="throughPoint1" tname="_circle1" /></extract>
        -<extract prop="x"><copy prop="throughPoint2" tname="_circle1" /></extract>)
      </radius>
    </circle>
    <copy prop="center" name="centerPoint" tname="_circle1" />
  </graph>
  `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a')// to wait for page to load


    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let centerPoint = components["/centerPoint"].replacements[0];
      let throughPoint1 = components["/_through1"].activeChildren[1];
      let throughPoint2 = components["/_through1"].activeChildren[2];

      let t1x = 1, t1y = 2;
      let t2x = 3, t2y = 4;

      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        let r = Math.abs(t1x - t2x);
        expect(components['/_circle1'].stateValues.radius.tree).eq(r);
        expect(components['/_circle1'].stateValues.throughPoints[0].tree).eqls(["vector", t1x, t1y])
        expect(components['/_circle1'].stateValues.throughPoints[1].tree).eqls(["vector", t2x, t2y])
        expect(throughPoint1.stateValues.coords.tree).eqls(["vector", t1x, t1y])
        expect(throughPoint2.stateValues.coords.tree).eqls(["vector", t2x, t2y])

      })

      cy.log("move circle");
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        let numericalCenter = components['/_circle1'].stateValues.numericalCenter;
        let dx = 2, dy = -3;
        let newCenter = [numericalCenter[0] + dx, numericalCenter[1] + dy];
        t1x += dx;
        t1y += dy;
        t2x += dx;
        t2y += dy;

        components['/_circle1'].moveCircle({ center: newCenter });

        let r = Math.abs(t1x - t2x);
        expect(components['/_circle1'].stateValues.radius.tree).eq(r);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][0]).closeTo(t1x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][1]).closeTo(t1y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][0]).closeTo(t2x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][1]).closeTo(t2y, 1E-12);

        expect(throughPoint1.stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(throughPoint1.stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(throughPoint2.stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(throughPoint2.stateValues.xs[1].tree).closeTo(t2y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(newCenter[0], 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(newCenter[1], 1E-12);
      })

      cy.log("move center point");
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        let numericalCenter = components['/_circle1'].stateValues.numericalCenter;
        let dx = -5, dy = -2;
        let newCenter = [numericalCenter[0] + dx, numericalCenter[1] + dy];
        t1x += dx;
        t1y += dy;
        t2x += dx;
        t2y += dy;

        centerPoint.movePoint({ x: newCenter[0], y: newCenter[1] });

        let r = Math.abs(t1x - t2x);
        expect(components['/_circle1'].stateValues.radius.tree).eq(r);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][0]).closeTo(t1x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][1]).closeTo(t1y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][0]).closeTo(t2x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][1]).closeTo(t2y, 1E-12);

        expect(throughPoint1.stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(throughPoint1.stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(throughPoint2.stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(throughPoint2.stateValues.xs[1].tree).closeTo(t2y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(newCenter[0], 1E-12);
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(newCenter[1], 1E-12);

      })

      cy.log("move first through point");
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        t1x = 6;
        t1y = 3;
        throughPoint1.movePoint({ x: t1x, y: t1y });

        let r = Math.abs(t1x - t2x);
        expect(components['/_circle1'].stateValues.radius.tree).eq(r);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][0]).closeTo(t1x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][1]).closeTo(t1y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][0]).closeTo(t2x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][1]).closeTo(t2y, 1E-12);

        expect(throughPoint1.stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(throughPoint1.stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(throughPoint2.stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(throughPoint2.stateValues.xs[1].tree).closeTo(t2y, 1E-12);


      })


      cy.log("move second through point under first through point");
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        t2x = 5;
        t2y = -3;
        throughPoint2.movePoint({ x: t2x, y: t2y });

        let r = Math.abs(t1x - t2x);
        expect(components['/_circle1'].stateValues.radius.tree).eq(r);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][0]).closeTo(t1x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][1]).closeTo(t1y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][0]).closeTo(t2x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][1]).closeTo(t2y, 1E-12);

        expect(throughPoint1.stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(throughPoint1.stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(throughPoint2.stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(throughPoint2.stateValues.xs[1].tree).closeTo(t2y, 1E-12);

        expect(Number.isFinite(components['/_circle1'].stateValues.numericalCenter[0])).false;
        expect(Number.isFinite(components['/_circle1'].stateValues.numericalCenter[1])).false;


      })


      cy.log("move second through point close enough to make circle");
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        t2y = 1.5;
        throughPoint2.movePoint({ x: t2x, y: t2y });

        let r = Math.abs(t1x - t2x);
        expect(components['/_circle1'].stateValues.radius.tree).eq(r);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][0]).closeTo(t1x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][1]).closeTo(t1y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][0]).closeTo(t2x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][1]).closeTo(t2y, 1E-12);

        expect(throughPoint1.stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(throughPoint1.stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(throughPoint2.stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(throughPoint2.stateValues.xs[1].tree).closeTo(t2y, 1E-12);

        expect(Number.isFinite(components['/_circle1'].stateValues.numericalCenter[0])).true;
        expect(Number.isFinite(components['/_circle1'].stateValues.numericalCenter[1])).true;


      })


    })
  })

  it('circle with dependencies among radius and two through points', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
  <text>a</text>
  <graph>
    <circle>
      <through hide="false">
      (1,2),(<copy prop="radius" tname="_circle1" />+1, 3)
      </through>
      <radius>
        <extract prop="x"><copy prop="throughPoint1" tname="_circle1" /></extract>
      </radius>
    </circle>
    <copy prop="center" name="centerPoint" tname="_circle1" />
  </graph>
  `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a')// to wait for page to load


    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let centerPoint = components["/centerPoint"].replacements[0];
      let throughPoint1 = components["/_through1"].activeChildren[1];
      let throughPoint2 = components["/_through1"].activeChildren[2];

      let t1x = 1, t1y = 2;
      let t2x = 2, t2y = 3;

      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        let r = t1x;
        expect(components['/_circle1'].stateValues.radius.tree).eq(r);
        expect(components['/_circle1'].stateValues.throughPoints[0].tree).eqls(["vector", t1x, t1y])
        expect(components['/_circle1'].stateValues.throughPoints[1].tree).eqls(["vector", t2x, t2y])
        expect(throughPoint1.stateValues.coords.tree).eqls(["vector", t1x, t1y])
        expect(throughPoint2.stateValues.coords.tree).eqls(["vector", t2x, t2y])

      })

      cy.log("move circle");
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        let numericalCenter = components['/_circle1'].stateValues.numericalCenter;
        let dx = 2, dy = -3;
        let newCenter = [numericalCenter[0] + dx, numericalCenter[1] + dy];
        t1x += dx;
        t1y += dy;
        t2x += dx;
        t2y += dy;

        components['/_circle1'].moveCircle({ center: newCenter });

        let r = t1x;
        expect(components['/_circle1'].stateValues.radius.tree).eq(r);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][0]).closeTo(t1x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][1]).closeTo(t1y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][0]).closeTo(t2x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][1]).closeTo(t2y, 1E-12);

        expect(throughPoint1.stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(throughPoint1.stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(throughPoint2.stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(throughPoint2.stateValues.xs[1].tree).closeTo(t2y, 1E-12);

        expect(Number.isFinite(components['/_circle1'].stateValues.numericalCenter[0])).true;
        expect(Number.isFinite(components['/_circle1'].stateValues.numericalCenter[1])).true;
      })

      cy.log("move center point");
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        let numericalCenter = components['/_circle1'].stateValues.numericalCenter;
        let dx = -1, dy = -2;
        let newCenter = [numericalCenter[0] + dx, numericalCenter[1] + dy];
        t1x += dx;
        t1y += dy;
        t2x += dx;
        t2y += dy;

        centerPoint.movePoint({ x: newCenter[0], y: newCenter[1] });

        let r = t1x
        expect(components['/_circle1'].stateValues.radius.tree).eq(r);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][0]).closeTo(t1x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][1]).closeTo(t1y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][0]).closeTo(t2x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][1]).closeTo(t2y, 1E-12);

        expect(throughPoint1.stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(throughPoint1.stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(throughPoint2.stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(throughPoint2.stateValues.xs[1].tree).closeTo(t2y, 1E-12);

        expect(Number.isFinite(components['/_circle1'].stateValues.numericalCenter[0])).true;
        expect(Number.isFinite(components['/_circle1'].stateValues.numericalCenter[1])).true;

      })

      cy.log("move first through point");
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        t1x = 6;
        t1y = 3;
        throughPoint1.movePoint({ x: t1x, y: t1y });

        let r = t1x;
        t2x = t1x + 1;
        expect(components['/_circle1'].stateValues.radius.tree).eq(r);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][0]).closeTo(t1x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][1]).closeTo(t1y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][0]).closeTo(t2x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][1]).closeTo(t2y, 1E-12);

        expect(throughPoint1.stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(throughPoint1.stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(throughPoint2.stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(throughPoint2.stateValues.xs[1].tree).closeTo(t2y, 1E-12);


      })


      cy.log("move second through point under first through point");
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        t2y = -9;
        throughPoint2.movePoint({ x: t2x, y: t2y });

        let r = t1x;
        expect(components['/_circle1'].stateValues.radius.tree).eq(r);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][0]).closeTo(t1x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][1]).closeTo(t1y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][0]).closeTo(t2x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][1]).closeTo(t2y, 1E-12);

        expect(throughPoint1.stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(throughPoint1.stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(throughPoint2.stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(throughPoint2.stateValues.xs[1].tree).closeTo(t2y, 1E-12);

        expect(Number.isFinite(components['/_circle1'].stateValues.numericalCenter[0])).false;
        expect(Number.isFinite(components['/_circle1'].stateValues.numericalCenter[1])).false;


      })


      cy.log("move second through point to the right");
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        t2x = 8;
        throughPoint2.movePoint({ x: t2x, y: t2y });

        t1x = t2x - 1;
        let r = t1x;

        expect(components['/_circle1'].stateValues.radius.tree).eq(r);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][0]).closeTo(t1x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][1]).closeTo(t1y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][0]).closeTo(t2x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][1]).closeTo(t2y, 1E-12);

        expect(throughPoint1.stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(throughPoint1.stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(throughPoint2.stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(throughPoint2.stateValues.xs[1].tree).closeTo(t2y, 1E-12);

        expect(Number.isFinite(components['/_circle1'].stateValues.numericalCenter[0])).true;
        expect(Number.isFinite(components['/_circle1'].stateValues.numericalCenter[1])).true;


      })


    })
  })

  it('circle where two through point 2 depends on through point 1', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
  <text>a</text>
  <graph>
    <circle>
      <through hide="false">
        <point>(1,2)</point>
        <point>
        (<extract prop="x"><copy prop="throughPoint1" tname="_circle1" /></extract>+1, 3)
        </point>
      </through>
    </circle>
    <copy prop="center" name="centerPoint" tname="_circle1" />
  </graph>
  `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a')// to wait for page to load


    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let centerPoint = components["/centerPoint"].replacements[0];
      let throughPoint1 = components["/_through1"].activeChildren[1];
      let throughPoint2 = components["/_through1"].activeChildren[2];

      let t1x = 1, t1y = 2;
      let t2x = 2, t2y = 3;

      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        let r = Math.sqrt(Math.pow(t1x - t2x, 2) + Math.pow(t1y - t2y, 2)) / 2;

        let cx = (t1x + t2x) / 2;
        let cy = (t1y + t2y) / 2;

        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);
        expect(components['/_circle1'].stateValues.throughPoints[0].tree).eqls(["vector", t1x, t1y])
        expect(components['/_circle1'].stateValues.throughPoints[1].tree).eqls(["vector", t2x, t2y])
        expect(throughPoint1.stateValues.coords.tree).eqls(["vector", t1x, t1y])
        expect(throughPoint2.stateValues.coords.tree).eqls(["vector", t2x, t2y])

        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12)
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12)

      })

      cy.log("move circle");
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        let cx = (t1x + t2x) / 2;
        let cy = (t1y + t2y) / 2;

        let dx = 2, dy = -3;
        cx += dx;
        cy += dy;
        t1x += dx;
        t1y += dy;
        t2x += dx;
        t2y += dy;

        components['/_circle1'].moveCircle({ center: [cx, cy] });

        let r = Math.sqrt(Math.pow(t1x - t2x, 2) + Math.pow(t1y - t2y, 2)) / 2;

        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][0]).closeTo(t1x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][1]).closeTo(t1y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][0]).closeTo(t2x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][1]).closeTo(t2y, 1E-12);

        expect(throughPoint1.stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(throughPoint1.stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(throughPoint2.stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(throughPoint2.stateValues.xs[1].tree).closeTo(t2y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12)
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12)
      })

      cy.log("move center point");
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        let cx = (t1x + t2x) / 2;
        let cy = (t1y + t2y) / 2;

        let dx = -1, dy = -2;
        cx += dx;
        cy += dy;
        t1x += dx;
        t1y += dy;
        t2x += dx;
        t2y += dy;

        centerPoint.movePoint({ x: cx, y: cy });

        let r = Math.sqrt(Math.pow(t1x - t2x, 2) + Math.pow(t1y - t2y, 2)) / 2;
        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][0]).closeTo(t1x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][1]).closeTo(t1y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][0]).closeTo(t2x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][1]).closeTo(t2y, 1E-12);

        expect(throughPoint1.stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(throughPoint1.stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(throughPoint2.stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(throughPoint2.stateValues.xs[1].tree).closeTo(t2y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12)
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12)

      })

      cy.log("move first through point");
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        t1x = 6;
        t1y = 3;
        throughPoint1.movePoint({ x: t1x, y: t1y });

        t2x = t1x + 1;
        let r = Math.sqrt(Math.pow(t1x - t2x, 2) + Math.pow(t1y - t2y, 2)) / 2;

        let cx = (t1x + t2x) / 2;
        let cy = (t1y + t2y) / 2;

        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][0]).closeTo(t1x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][1]).closeTo(t1y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][0]).closeTo(t2x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][1]).closeTo(t2y, 1E-12);

        expect(throughPoint1.stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(throughPoint1.stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(throughPoint2.stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(throughPoint2.stateValues.xs[1].tree).closeTo(t2y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12)
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12)

      })


      cy.log("move second through point");
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        t2x = -7;
        t2y = -9;
        throughPoint2.movePoint({ x: t2x, y: t2y });

        t1x = t2x - 1;
        let r = Math.sqrt(Math.pow(t1x - t2x, 2) + Math.pow(t1y - t2y, 2)) / 2;

        let cx = (t1x + t2x) / 2;
        let cy = (t1y + t2y) / 2;

        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][0]).closeTo(t1x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][1]).closeTo(t1y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][0]).closeTo(t2x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][1]).closeTo(t2y, 1E-12);

        expect(throughPoint1.stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(throughPoint1.stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(throughPoint2.stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(throughPoint2.stateValues.xs[1].tree).closeTo(t2y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12)
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12)

      })


    })
  })

  it('circle with dependencies among three through points', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
  <text>a</text>
  <graph>
    <circle>
      <through hide="false">
        <point>
        (<extract prop="x"><copy prop="throughPoint2" tname="_circle1" /></extract>+1, 3)
        </point>
        <point>(1,2)</point>
        <point>
        (<extract prop="x"><copy prop="throughPoint1" tname="_circle1" /></extract>+1, 5)
        </point>
      </through>
    </circle>
    <copy prop="center" name="centerPoint" tname="_circle1" />
  </graph>
  `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a')// to wait for page to load


    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let centerPoint = components["/centerPoint"].replacements[0];
      let throughPoint1 = components["/_through1"].activeChildren[1];
      let throughPoint2 = components["/_through1"].activeChildren[2];
      let throughPoint3 = components["/_through1"].activeChildren[3];

      let t1x = 2, t1y = 3;
      let t2x = 1, t2y = 2;
      let t3x = 3, t3y = 5;

      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);


        expect(Number.isFinite(components['/_circle1'].stateValues.radius.tree)).true;
        expect(components['/_circle1'].stateValues.throughPoints[0].tree).eqls(["vector", t1x, t1y])
        expect(components['/_circle1'].stateValues.throughPoints[1].tree).eqls(["vector", t2x, t2y])
        expect(components['/_circle1'].stateValues.throughPoints[2].tree).eqls(["vector", t3x, t3y])
        expect(throughPoint1.stateValues.coords.tree).eqls(["vector", t1x, t1y])
        expect(throughPoint2.stateValues.coords.tree).eqls(["vector", t2x, t2y])
        expect(throughPoint3.stateValues.coords.tree).eqls(["vector", t3x, t3y])

        expect(Number.isFinite(components['/_circle1'].stateValues.numericalCenter[0])).true;
        expect(Number.isFinite(components['/_circle1'].stateValues.numericalCenter[1])).true;

      })

      cy.log("move circle");
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        let numericalCenter = components['/_circle1'].stateValues.numericalCenter;
        let cx = numericalCenter[0];
        let cy = numericalCenter[1];

        let dx = 2, dy = -3;
        cx += dx;
        cy += dy;
        t1x += dx;
        t1y += dy;
        t2x += dx;
        t2y += dy;
        t3x += dx;
        t3y += dy;

        let r = components['/_circle1'].stateValues.radius.tree;

        components['/_circle1'].moveCircle({ center: [cx, cy] });

        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][0]).closeTo(t1x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][1]).closeTo(t1y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][0]).closeTo(t2x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][1]).closeTo(t2y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[2][0]).closeTo(t3x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[2][1]).closeTo(t3y, 1E-12);

        expect(throughPoint1.stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(throughPoint1.stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(throughPoint2.stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(throughPoint2.stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(throughPoint3.stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(throughPoint3.stateValues.xs[1].tree).closeTo(t3y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12)
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12)
      })

      cy.log("move center point");
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);


        let numericalCenter = components['/_circle1'].stateValues.numericalCenter;
        let cx = numericalCenter[0];
        let cy = numericalCenter[1];

        let dx = -1, dy = -2;
        cx += dx;
        cy += dy;
        t1x += dx;
        t1y += dy;
        t2x += dx;
        t2y += dy;
        t3x += dx;
        t3y += dy;

        let r = components['/_circle1'].stateValues.radius.tree;

        centerPoint.movePoint({ x: cx, y: cy });

        expect(components['/_circle1'].stateValues.radius.tree).closeTo(r, 1E-12);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][0]).closeTo(t1x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][1]).closeTo(t1y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][0]).closeTo(t2x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][1]).closeTo(t2y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[2][0]).closeTo(t3x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[2][1]).closeTo(t3y, 1E-12);

        expect(throughPoint1.stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(throughPoint1.stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(throughPoint2.stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(throughPoint2.stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(throughPoint3.stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(throughPoint3.stateValues.xs[1].tree).closeTo(t3y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalCenter[0]).closeTo(cx, 1E-12)
        expect(components['/_circle1'].stateValues.numericalCenter[1]).closeTo(cy, 1E-12)

      })

      cy.log("move first through point");
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        t1x = 6;
        t1y = 3;
        throughPoint1.movePoint({ x: t1x, y: t1y });

        t3x = t1x + 1;
        t2x = t1x - 1;

        expect(Number.isFinite(components['/_circle1'].stateValues.radius.tree)).true;

        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][0]).closeTo(t1x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][1]).closeTo(t1y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][0]).closeTo(t2x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][1]).closeTo(t2y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[2][0]).closeTo(t3x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[2][1]).closeTo(t3y, 1E-12);

        expect(throughPoint1.stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(throughPoint1.stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(throughPoint2.stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(throughPoint2.stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(throughPoint3.stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(throughPoint3.stateValues.xs[1].tree).closeTo(t3y, 1E-12);

        expect(Number.isFinite(components['/_circle1'].stateValues.numericalCenter[0])).true;
        expect(Number.isFinite(components['/_circle1'].stateValues.numericalCenter[1])).true;

      })


      cy.log("move second through point");
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        t2x = -7;
        t2y = -9;
        throughPoint2.movePoint({ x: t2x, y: t2y });

        t1x = t2x + 1;
        t3x = t1x + 1;

        expect(Number.isFinite(components['/_circle1'].stateValues.radius.tree)).true;

        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][0]).closeTo(t1x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][1]).closeTo(t1y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][0]).closeTo(t2x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][1]).closeTo(t2y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[2][0]).closeTo(t3x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[2][1]).closeTo(t3y, 1E-12);

        expect(throughPoint1.stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(throughPoint1.stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(throughPoint2.stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(throughPoint2.stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(throughPoint3.stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(throughPoint3.stateValues.xs[1].tree).closeTo(t3y, 1E-12);

        expect(Number.isFinite(components['/_circle1'].stateValues.numericalCenter[0])).true;
        expect(Number.isFinite(components['/_circle1'].stateValues.numericalCenter[1])).true;

      })


      cy.log("move third through point");
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        t3x = 1;
        t3y = -2;
        throughPoint3.movePoint({ x: t3x, y: t3y });

        t1x = t3x - 1;
        t2x = t1x - 1;

        expect(Number.isFinite(components['/_circle1'].stateValues.radius.tree)).true;

        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][0]).closeTo(t1x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[0][1]).closeTo(t1y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][0]).closeTo(t2x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[1][1]).closeTo(t2y, 1E-12);

        expect(components['/_circle1'].stateValues.numericalThroughPoints[2][0]).closeTo(t3x, 1E-12);
        expect(components['/_circle1'].stateValues.numericalThroughPoints[2][1]).closeTo(t3y, 1E-12);

        expect(throughPoint1.stateValues.xs[0].tree).closeTo(t1x, 1E-12);
        expect(throughPoint1.stateValues.xs[1].tree).closeTo(t1y, 1E-12);
        expect(throughPoint2.stateValues.xs[0].tree).closeTo(t2x, 1E-12);
        expect(throughPoint2.stateValues.xs[1].tree).closeTo(t2y, 1E-12);
        expect(throughPoint3.stateValues.xs[0].tree).closeTo(t3x, 1E-12);
        expect(throughPoint3.stateValues.xs[1].tree).closeTo(t3y, 1E-12);

        expect(Number.isFinite(components['/_circle1'].stateValues.numericalCenter[0])).true;
        expect(Number.isFinite(components['/_circle1'].stateValues.numericalCenter[1])).true;

      })


    })
  })

  it('essential center can combine coordinates', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
  <text>a</text>
  <graph>
    <circle/>
    <point>
      (
        <extract prop="y"><copy prop="center" tname="_circle1" /></extract>,
        <extract prop="x"><copy prop="center" tname="_circle1" /></extract>
      )
    </point>
    <copy prop="center" name="centerPoint" tname="_circle1" />
  </graph>
  `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a')// to wait for page to load


    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let centerPoint = components["/centerPoint"].replacements[0];

      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        expect(components['/_circle1'].stateValues.numericalRadius).eq(1);
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([0, 0]);
        expect(centerPoint.stateValues.coords.tree).eqls(["vector", 0, 0])
        expect(components["/_point1"].stateValues.coords.tree).eqls(["vector", 0, 0])

      })

      cy.log("move circle");
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        components['/_circle1'].moveCircle({ center: [-7, 2] });
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([-7, 2]);
        expect(centerPoint.stateValues.coords.tree).eqls(["vector", -7, 2])
        expect(components["/_point1"].stateValues.coords.tree).eqls(["vector", 2, -7])
      })

      cy.log("move flipped point");
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        components["/_point1"].movePoint({ x: -3, y: -5 });
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([-5, -3]);
        expect(centerPoint.stateValues.coords.tree).eqls(["vector", -5, -3])
        expect(components["/_point1"].stateValues.coords.tree).eqls(["vector", -3, -5])

      })

      cy.log("move center point");
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        centerPoint.movePoint({ x: 1, y: -4 });
        expect(components['/_circle1'].stateValues.numericalCenter).eqls([1, -4]);
        expect(centerPoint.stateValues.coords.tree).eqls(["vector", 1, -4])
        expect(components["/_point1"].stateValues.coords.tree).eqls(["vector", -4, 1])

      })


    })
  })

});
