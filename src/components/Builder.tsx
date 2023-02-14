import { useState, useCallback, createContext, useContext, Fragment } from "react";
import { RuleGroup } from "../data/models";
import FilterGroup from "./FilterGroup";
import QueryOutput from "./QueryOutput";

const DEFAULT_RULE_GROUP: RuleGroup = {
  id: 0,
  children: [{ id: 0, type: "rule" }],
  conjunction: "OR",
  not: false,
  type: "rule_group"
};

const FilterContext = createContext({ filterGroups: [DEFAULT_RULE_GROUP] });

const QueryBuilder = () => {
  const { filterGroups } = useContext(FilterContext);
  const [groups, setGroups] = useState(filterGroups);

  const addFilterGroup = useCallback(() => {
    setGroups(groups => [ ...groups, { ...DEFAULT_RULE_GROUP, id: groups.length } ]);
  }, []);

  const updateFilterGroup = useCallback((id: number, ruleGroup: RuleGroup) => {
    setGroups(groups => groups.map(group => {
      if (group.id === id) {
        return { ...group, ...ruleGroup };
      }
      return group;
    }));
  }, []);

  return (
    <div className="flex rounded content-wrapper w-full justify-between">
      <div className="center-content p-10 w-full rounded">
        <h1 className="mt-1 bg-[#5C61F0] p-6 text-gray-100 w-full text-lg leading-7 font-medium">
          <span>Build your query</span>
          <QueryOutput groups={groups} />
        </h1>
        <div className="bg-[#1D2025] shadow-xl p-2 mb-4 border-gray-500 flex flex-col items-start justify-center">
          {groups.map((group, i) => (
            <Fragment key={`group-${i}`}>
              <FilterGroup id={i} filterGroup={group} onUpdate={updateFilterGroup} />
              <div className="border-gray-700 h-10 mx-4 -my-4 border flex flex-col" />
            </Fragment>
          ))}
          <button
            className="bg-[#4F46E5] shadow-xl px-3 py-2 mt-4 mb-4 rounded text-gray-100 self-start submitBtn"
            onClick={addFilterGroup}
          >
            <span className="flex flex-row items-center justify-between pointer-events-none">
              + Add new group filter
              </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QueryBuilder;
