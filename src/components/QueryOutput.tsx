import { useCallback, useMemo } from "react";
import { conditions, conjunctions } from "../data/content";
import type { ConjunctionType, RuleGroup } from "../data/models";

interface Props {
  groups: Array<RuleGroup>;
}

const serverPort = "4000";

const QueryOutput = ({ groups }: Props) => {
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
      .join(` ${conjunctions.get("AND")} `);
  }, [groups]);

  const handleCopyToClipboard = useCallback(() => {
    window.alert("Query copied to clipboard!")
    navigator.clipboard.writeText(buildQuery);
  }, [buildQuery]);

  const handleSendToStringAPI = useCallback(() => {
    fetch("http://localhost:"+serverPort+"/query/string", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: buildQuery }),
    })
    .then(() => {
      window.alert("Query sent as string to server running on port " + serverPort);
    })
    .catch(error => console.error(error))
  }, [buildQuery]);


  const handleSendToRuleObjectAPI = useCallback(() => {
    fetch("http://localhost:"+serverPort+"/query/rule-object", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: groups }),
    })
    .then(() => {
      window.alert("Query sent as array of ruleGroup objects to server running on port " + serverPort);
    })
    .catch(error => console.error(error))
  }, [groups]);

  return buildQuery.length > 0 ? (
    <div>
    <div className="bg-[#4338CA] m-5 p-2 rounded flex self-start text-sm">
      <div className="font-bold mr-2">{"Query: "}</div>
      <div>{buildQuery}</div>
      <button className="ml-auto mr-4" onClick={handleCopyToClipboard}>
        <img className="w-6" src='./copy.png' />
      </button>
    </div>
    <div className="text-sm flex">
    <button className="mx-4 rounded bg-[#1c1752] p-2" onClick={handleSendToStringAPI}>
        Send to String API
      </button>
      <button className="rounded bg-[#1c1752] p-2" onClick={handleSendToRuleObjectAPI}>
        Send to Rule Object API
      </button>
      </div>
    </div>
  ) : null;
};

export default QueryOutput;
