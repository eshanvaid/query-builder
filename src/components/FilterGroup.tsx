import { useCallback, useEffect, useState } from "react";
import Filter from "./Rule";
import type { Rule, RuleGroup } from "../data/models";

interface FilterGroupProps {
  id: number;
  filterGroup: RuleGroup;
  onUpdate: (id: number, ruleGroup: RuleGroup, rules: Array<Rule>) => void;
}

const defaultFilter: Rule = { id: 0, type: "rule" };

const FilterGroup = ({ id, filterGroup, onUpdate }: FilterGroupProps) => {
  const [conjunctionType, setConjunctionType] = useState(filterGroup.conjunction);
  const [filters, setFilters] = useState<Rule[]>(filterGroup.children);

  const handleAddFilter = useCallback(() => {
    setFilters(prevFilters =>
      prevFilters.concat({ ...defaultFilter, id: prevFilters.length })
    );
  }, []);

  const handleUpdateFilter = useCallback((filterId: number, updatedRule: Rule) => {
    setFilters(prevFilters =>
      prevFilters.map(prevFilter => {
        if (prevFilter.id === filterId) {
          return { ...prevFilter, ...updatedRule };
        }
        return prevFilter;
      })
    );
  }, []);

  const handleDeleteFilter = useCallback((filterId: number) => {
    setFilters(prevFilters => {
      const updatedFilters = prevFilters.filter(filter => filter.id !== filterId);
      return updatedFilters.map((updatedFilter, index) => ({ ...updatedFilter, id: index }));
    });
  }, []);

  useEffect(() => {
    if (onUpdate) {
      onUpdate(filterGroup.id, {
        id: filterGroup.id,
        conjunction: conjunctionType,
        children: filters,
        type: "rule_group"
      }, filters);
    }
  }, [conjunctionType, filters, filterGroup.id, onUpdate]);

  return (
    <div className="bg-[#282B30] border-2 border-gray-700 shadow-xl p-6 mt-1 mb-4 min-w-full flex flex-col justify-center content-center">
      <div className="self-start px-5">
        <div className="inline-flex">
          <button onClick={() => setConjunctionType("AND")} className={`${conjunctionType === "AND" ? "bg-[#5C61F0]" : "bg-[#404348]"} text-white font-bold text-md py-1 px-3 rounded-l`}>
              AND
          </button>
          <button onClick={() => setConjunctionType("OR")} className={`${conjunctionType === "OR" ? "bg-[#5C61F0]" : "bg-[#404348]"} text-white font-bold text-md py-1 px-3 rounded-r`}>
              OR
          </button>
        </div>
      </div>
      {filters.map((filter, index) => (
        <Filter
          key={`filter-${filter.id}-${filter.field}`}
          rule={filter}
          canDelete={index > 0}
          onDelete={handleDeleteFilter}
          onChange={handleUpdateFilter}
        />
      ))}
      <button
        className="bg-[#4F46E5] shadow-xl px-3 py-2 mt-4 mx-5 mb-4 rounded text-gray-100 self-start submitBtn"
        onClick={handleAddFilter}
      >
        <span className="flex flex-row items-center justify-between pointer-events-none">
          + Add filter
        </span>
      </button>
    </div>
  );
};

export default FilterGroup;