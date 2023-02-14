import { useMemo } from "react";
import { conditions, conjunctions } from "../data/content";
import type { ConjunctionType, RuleGroup } from "../data/models";

interface Props {
  conjunction: ConjunctionType;
  filters: Array<RuleGroup>;
}

const QueryOutput = ({ conjunction, filters }: Props) => {
  const buildQuery = useMemo(() => {
    return filters
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
  }, [filters, conjunction]);

  return buildQuery.length > 0 ? (
    <div className="bg-[#4338CA] m-5 p-2 rounded flex self-start text-sm">
      <div className="font-bold mr-2">{"Query: "}</div>
      <div>{buildQuery}</div>
    </div>
  ) : null;
};

export default QueryOutput;
