import { ConditionType, ConjunctionType } from "./models";

const conjunctionsMap = new Map<ConjunctionType, string>([
  ["OR", "||"],
  ["AND", "&&"]
]);

const fieldsList = [
  "Theme",
  "Sub-theme",
  "Reason",
  "Language",
  "Source",
  "Rating",
  "Time Period",
  "Customer ID"
];

const conditionsMap = new Map<ConditionType, string>([
  ["Equals", "=="],
  ["Does not equal", "!="],
  ["Like", "LIKE"],
  ["Not like", "NOT LIKE"],
  ["Is Empty", "IS NULL"],
  ["Is", "IS"],
  ["Is not", "IS (NOT)"]
]);

const criteriasList = [
  "Offers",
  "Performance",
  "Platform",
  "Product Feedback"
];

export {
  conjunctionsMap as conjunctions,
  fieldsList as fields,
  conditionsMap as conditions,
  criteriasList as criterias
};
