import InlineComponent from './abstract/InlineComponent';

export default class StringComponent extends InlineComponent {
  static componentType = "string";

  // used when referencing this component without prop
  static useChildrenForReference = false;
  static get stateVariablesShadowedForReference() { return ["value"] };

  static createPropertiesObject() {
    return {};
  }


  static returnStateVariableDefinitions() {

    let stateVariableDefinitions = super.returnStateVariableDefinitions();

    stateVariableDefinitions.value = {
      returnDependencies: () => ({}),
      defaultValue: "",
      forRenderer: true,
      definition: () => ({
        useEssentialOrDefaultValue: {
          value: { variablesToCheck: "value" },
        }
      }),
      inverseDefinition({ desiredStateVariableValues }) {
        return {
          success: true,
          instructions: [{
            setStateVariable: "value",
            value: desiredStateVariableValues.value
          }]
        };
      }
    }

    stateVariableDefinitions.text = {
      returnDependencies: () => ({
        value: {
          dependencyType: "stateVariable",
          variableName: "value"
        }
      }),
      definition({ dependencyValues }) {
        return { newValues: { text: dependencyValues.value } }
      },
      inverseDefinition({ desiredStateVariableValues }) {
        return {
          success: true,
          instructions: [{
            setDependency: "value",
            desiredValue: desiredStateVariableValues.text
          }]
        };
      }
    }

    return stateVariableDefinitions;

  }

}
