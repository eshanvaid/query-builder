import { useState, useCallback, useEffect } from "react";
import DropDown from "./DropDown";
import { fields, conditions, criterias } from "../data/content";
import type { Rule, ConditionType } from "../data/models";

interface Props {
  rule: Rule;
  canDelete: boolean;
  onDelete: (id: number) => void;
  onChange: (id: number, rule: Rule) => void;
}

const conditionValues = Array.from(conditions.keys());

const Filter = ({ rule, canDelete, onDelete, onChange }: Props) => {
  const [currentRule, setCurrentRule] = useState(rule);

  const updateField = useCallback((value: string) => {
    setCurrentRule((rule) => ({ ...rule, field: value }));
  }, []);

  const updateCondition = useCallback((value: string) => {
    setCurrentRule((rule) => ({
      ...rule,
      condition: value as ConditionType
    }));
  }, []);

  const updateCriteria = useCallback((value: string) => {
    setCurrentRule((rule) => ({ ...rule, value }));
  }, []);

  useEffect(() => {
    if (onChange) {
      onChange(rule.id, currentRule);
    }
  }, [rule.id, currentRule, onChange]);

  return (
    <div className="p-4 flex flex-row items-center">
      <DropDown
        label="Field"
        options={fields}
        value={rule.field}
        onChange={updateField}
      />
      <DropDown
        label="Condition"
        options={conditionValues}
        value={rule.condition}
        onChange={updateCondition}
      />
      <DropDown
        label="Criteria"
        options={criterias}
        value={rule.value}
        onChange={updateCriteria}
      />
      {canDelete ? (
        <button
          className="bg-[#404348] p-0.5 mt-6 rounded text-gray-100 self-start submitBtn"
          onClick={onDelete.bind(null, rule.id)}
        >
          <span className="flex items-center pointer-events-none">
            <img src="./trash.png" alt="delete" className="m-1" />
          </span>{" "}
        </button>
      ) : null}
    </div>
  );
};

export default Filter;
