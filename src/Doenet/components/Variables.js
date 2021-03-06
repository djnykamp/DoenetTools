import MathList from './MathList';
import me from 'math-expressions';

export default class Variables extends MathList {
  static componentType = "variables";

  // TODO: how to add this feature?
  static additionalStateVariablesForProperties = ["validVariables"];

  // when another component has a property that is a mathlist,
  // use the maths state variable to populate that property
  static stateVariableForPropertyValue = "variables";


  static returnStateVariableDefinitions() {

    let stateVariableDefinitions = super.returnStateVariableDefinitions();

    stateVariableDefinitions.variables = {
      public: true,
      componentType: "variable",
      isArray: true,
      entryPrefixes: ["var"],
      returnDependencies: () => ({
        maths: {
          dependencyType: "stateVariable",
          variableName: "maths"
        },
      }),
      definition: function ({ dependencyValues }) {
        return {
          newValues: {
            variables: dependencyValues.maths
          }
        }
      }
    }

    let thisComponentType = this.componentType;

    stateVariableDefinitions.validVariables = {
      returnDependencies: () => ({
        variables: {
          dependencyType: "stateVariable",
          variableName: "variables"
        },
      }),
      definition: function ({ dependencyValues }) {
        let validVariables = [];

        for (let variable of dependencyValues.variables) {

          // to be a valid variable, tree must be either
          // - a string, or
          // - a string with a subscript that is a string or a number
          let tree = variable.tree;
          let validVariable = true;
          if (typeof tree === "string") {
            if (tree === '\uFF3F') {  // long underscore
              validVariable = false;
            }
          } else if (!Array.isArray(tree) ||
            tree[0] !== '_' ||
            (typeof tree[1] !== "string") ||
            ((typeof tree[2] !== "string" && typeof tree[2] !== "number"))
          ) {
            validVariable = false;
          }
          if (!validVariable) {
            console.warn("Invalid value for " + thisComponentType);
            validVariable = false;
          }
          validVariables.push(validVariable);

        }

        return { newValues: { validVariables } }
      }

    }
    return stateVariableDefinitions;
  }

  static markStaleForPropertyValue({ freshnessInfo }) {

    // just mark everything stale
    let freshByKey = Object.values(freshnessInfo)[0].freshByKey;
    for (let key in freshByKey) {
      delete freshByKey[key];
    }



    return { fresh: { [Object.keys(freshnessInfo)[0]]: false } }
  }

  static definitionForPropertyValue({ dependencyValues, propertySpecification, propertyChild,
    arrayKeys, freshnessInfo,
  }) {

    let freshByKey = Object.values(freshnessInfo)[0].freshByKey;

    let arrayKey;
    if (arrayKeys) {
      arrayKey = Number(arrayKeys[0]);
    }

    if (arrayKey !== undefined && freshByKey[arrayKey]) {
      return {};
    }

    let nVariables;

    if ("nVariables" in dependencyValues) {

      nVariables = dependencyValues.nVariables;

      // if nVariables isn't a number or isn't positive
      // don't have any variables
      if (!(nVariables > 0)) {
        return { newValues: { variables: [] } }
      }

    } else {

      // nVariables wasn't specified
      // let it be the variables specified in the variables property child

      nVariables = 0;
      if (propertyChild.length === 1) {
        nVariables = propertyChild[0].stateValues.variables.length;
      }
      if (nVariables === 0) {
        return { newValues: { variables: [] } }
      }

    }


    if (propertyChild.length === 0) {
      if (nVariables === 1) {
        freshByKey[0] = true;
        return { newValues: { variables: [me.fromAst("x")] } }
      } else if (nVariables === 2) {
        freshByKey[0] = true;
        freshByKey[1] = true;
        return { newValues: { variables: [me.fromAst("x"), me.fromAst("y")] } }
      } else if (nVariables === 3) {
        freshByKey[0] = true;
        freshByKey[1] = true;
        freshByKey[2] = true;
        return { newValues: { variables: [me.fromAst("x"), me.fromAst("y"), me.fromAst("z")] } }
      } else {
        let variables = [];
        for (let i = 1; i <= nVariables; i++) {
          freshByKey[i - 1] = true;
          variables.push(me.fromAst(`x_${i}`))
        }
        return { newValues: { variables } }
      }
    }

    let variables = propertyChild[0].stateValues.variables;

    let nVariablesSpecified = variables.length;

    if ((new Set(variables.map(x => x.toString()))).size < nVariablesSpecified) {
      console.warn('Duplicate variables specified')
    }

    for (let i = 0; i < nVariables; i++) {
      freshByKey[i] = true;
    }

    if (nVariablesSpecified >= nVariables) {
      return {
        newValues: {
          variables:
            variables.slice(0, nVariables)
        }
      }
    }


    let variablesUsed = [...variables.map(x => x.toString())];
    variables = [...variables];
    for (let i = nVariablesSpecified + 1; i <= nVariables; i++) {
      let preferredVariables;
      if (i == 1) {
        if (nVariables > 3) {
          preferredVariables = ["x_1"];
        } else {
          preferredVariables = ["x"];
        }
      } else if (i == 2) {
        if (nVariables > 3) {
          preferredVariables = ["x_2", "y_2"];
        } else {
          preferredVariables = ["y", "x_2"];
        }
      } else if (i == 3) {
        if (nVariables > 3) {
          preferredVariables = ["x_3", "y_3", "z_3"];
        } else {
          preferredVariables = ["z", "x_3", "z_3"];
        }
      } else {
        preferredVariables =
          ["x", "y", "z", "u", "v", "w", "X", "Y", "Z"].map(x => `${x}_${i}`)
      }
      let addedVariable = false;
      for (let v of preferredVariables) {
        if (!variablesUsed.includes(v)) {
          variables.push(me.fromText(v));
          variablesUsed.push(v);
          addedVariable = true;
          break;
        }
      }
      if (!addedVariable) {
        let v = preferredVariables[0]
        variables.push(me.fromText(v));
        variablesUsed.push(v);
        console.warn(`Variables added were not unique`)
      }
    }

    return { newValues: { variables } }


  }

  static attributesForPropertyValue = {
    isArray: true
  }

}