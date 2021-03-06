import InlineComponent from './abstract/InlineComponent';
import me from 'math-expressions';

export class M extends InlineComponent {
  static componentType = "m";
  static rendererType = "math";

  // used when creating new component via adapter or ref prop
  static primaryStateVariableForDefinition = "latex";

  static returnChildLogic(args) {
    let childLogic = super.returnChildLogic(args);

    let atLeastZeroStrings = childLogic.newLeaf({
      name: "atLeastZeroStrings",
      componentType: 'string',
      comparison: 'atLeast',
      number: 0,
    });
    let atLeastZeroTexts = childLogic.newLeaf({
      name: "atLeastZeroTexts",
      componentType: 'text',
      comparison: 'atLeast',
      number: 0,
    });
    let atLeastZeroMaths = childLogic.newLeaf({
      name: "atLeastZeroMaths",
      componentType: 'math',
      comparison: 'atLeast',
      number: 0,
    });
    let atLeastZeroMathlists = childLogic.newLeaf({
      name: "atLeastZeroMathlists",
      componentType: 'mathlist',
      comparison: 'atLeast',
      number: 0,
    });
    childLogic.newOperator({
      name: "stringsTextsAndMaths",
      operator: 'and',
      propositions: [atLeastZeroStrings, atLeastZeroTexts, atLeastZeroMaths, atLeastZeroMathlists],
      requireConsecutive: true,
      setAsBase: true,
    });
    return childLogic;
  }

  static returnStateVariableDefinitions() {

    let stateVariableDefinitions = super.returnStateVariableDefinitions();

    stateVariableDefinitions.latex = {
      public: true,
      componentType: this.componentType,
      defaultValue: "",
      forRenderer: true,
      returnDependencies: () => ({
        stringTextMathChildren: {
          dependencyType: "childIdentity",
          childLogicName: "stringsTextsAndMaths",
        },
        stringChildren: {
          dependencyType: "childStateVariables",
          childLogicName: "atLeastZeroStrings",
          variableNames: ["value"]
        },
        textChildren: {
          dependencyType: "childStateVariables",
          childLogicName: "atLeastZeroTexts",
          variableNames: ["value"]
        },
        mathChildren: {
          dependencyType: "childStateVariables",
          childLogicName: "atLeastZeroMaths",
          variableNames: ["latex"]
        },
        mathlistChildren: {
          dependencyType: "childStateVariables",
          childLogicName: "atLeastZeroMathlists",
          variableNames: ["latex"]
        },

      }),
      definition: function ({ dependencyValues, componentInfoObjects }) {

        if (dependencyValues.stringTextMathChildren.length === 0) {
          return {
            useEssentialOrDefaultValue: {
              latex: { variablesToCheck: "latex" }
            }
          }
        }

        let latex = "";
        let stringNum = 0;
        let textNum = 0;
        let mathNum = 0;
        let mathlistNum = 0;

        for (let child of dependencyValues.stringTextMathChildren) {

          if (child.componentType === "string") {
            latex += dependencyValues.stringChildren[stringNum].stateValues.value;
            stringNum++;
          } else if (componentInfoObjects.isInheritedComponentType({
            inheritedComponentType: child.componentType,
            baseComponentType: "text"
          })) {
            latex += dependencyValues.textChildren[textNum].stateValues.value;
            textNum++;
          } else if (componentInfoObjects.isInheritedComponentType({
            inheritedComponentType: child.componentType,
            baseComponentType: "math"
          })) {
            latex += dependencyValues.mathChildren[mathNum].stateValues.latex;
            mathNum++;
          } else if (componentInfoObjects.isInheritedComponentType({
            inheritedComponentType: child.componentType,
            baseComponentType: "mathlist"
          })) {
            latex += dependencyValues.mathlistChildren[mathlistNum].stateValues.value;
            mathlistNum++;
          }

        }
        return { newValues: { latex } }

      }

    }

    stateVariableDefinitions.renderMode = {
      forRenderer: true,
      returnDependencies: () => ({}),
      definition: () => ({ newValues: { renderMode: "inline" } })
    }


    stateVariableDefinitions.text = {
      returnDependencies: () => ({
        latex: {
          dependencyType: "stateVariable",
          variableName: "latex"
        }
      }),
      definition: function ({ dependencyValues }) {
        let expression;
        try {
          expression = me.fromLatex(dependencyValues.latex);
        } catch (e) {
          // just return latex if can't parse with math-expressions
          return { newValues: { text: dependencyValues.latex } };
        }
        return { newValues: { text: expression.toString() } };
      }
    }

    return stateVariableDefinitions;
  }

}

export class Me extends M {
  static componentType = "me";


  static returnStateVariableDefinitions() {

    let stateVariableDefinitions = super.returnStateVariableDefinitions();

    stateVariableDefinitions.renderMode.definition = () => ({
      newValues: { renderMode: "display" }
    });
    return stateVariableDefinitions;
  }
}

export class Men extends M {
  static componentType = "men";

  static returnStateVariableDefinitions() {

    let stateVariableDefinitions = super.returnStateVariableDefinitions();

    stateVariableDefinitions.renderMode.definition = () => ({
      newValues: { renderMode: "numbered" }
    });
    return stateVariableDefinitions;
  }
}


