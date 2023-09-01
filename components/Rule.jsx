import React from "react";
import { TrashIcon } from "@heroicons/react/20/solid";

import { ruleTypes } from "@/lib/rules";

const Rule = ({ rule, updateRule, removeRule }) => {
  const type = ruleTypes.find((ruleType) => ruleType.id === rule[0]);
  if (!type) return null;

  const setValue = (key, value) => {
    updateRule([rule[0], { ...rule[1], [key]: value }]);
  };

  return (
    <div className="flex flex-row items-center justify-between border border-gray-500 rounded-md p-2 mb-4">
      <div className="flex flex-row items-center gap-2">
        <select
          className="rounded-md border-0 font-semibold text-black"
          value={rule[0]}
          onChange={({ target }) => updateRule([target.value, rule[1]])}
        >
          {ruleTypes.map((ruleType) => (
            <option value={ruleType.id} key={ruleType.id}>
              {ruleType.title}
            </option>
          ))}
        </select>
        {type.description}
        {type.fields?.map(({ id, title, defaultValue, ...props }) => {
          return (
            <input
              key={id}
              type="text"
              placeholder={title}
              className="border-0 rounded-md"
              onChange={({ target }) => setValue(id, target.value)}
              value={rule[1][id] || defaultValue || ""}
              {...props}
            />
          );
        })}
      </div>
      <button
        className="p-2 text-gray-500 hover:text-black"
        onClick={removeRule}
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Rule;
