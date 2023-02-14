import { useCallback, useMemo, useRef } from "react";
import { conditions, conjunctions } from "../data/content";
import type { ConjunctionType, RuleGroup } from "../data/models";

interface Props {
  conjunction: ConjunctionType;
  groups: Array<RuleGroup>;
}

const QueryOutput = ({ conjunction, groups }: Props) => {

  const buildQuery = useMemo(() => {
    return groups
      .map((filter) => {
        if (!(filter.children[0].field && filter.children[0].condition && filter.children[0].value)) {
          return "";
        }
        return (
          " (" +
          filter.children
            .map((f) => {
              if (f.field && f.condition && f.value) {
                return `"field.${f.field.toLowerCase()} ${conditions.get(f.condition)} ${f.value}"`;
              }
              return "";
            })
            .filter((s) => s.length > 1)
            .join(` ${conjunctions.get(filter.conjunction)} `) +
          ")"
        );
      })
      .filter((s) => s.length > 1)
      .join(` ${conjunctions.get(conjunction)} `);
  }, [groups, conjunction]);

  const handleCopyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(buildQuery);
  }, [buildQuery]);

  return buildQuery.length > 0 ? (
    <div className="bg-[#4338CA] m-5 p-2 rounded flex self-start text-sm">
      <div className="font-bold mr-2">{"Query: "}</div>
      <div>{buildQuery}</div>
      <button className="ml-auto mr-4" onClick={handleCopyToClipboard}>
        <img className="w-6" src='./copy.png' />
      </button>
    </div>
  ) : null;
};

export default QueryOutput;
