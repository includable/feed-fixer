"use client";

import React, { useEffect, useState } from "react";

import Input from "./Input";
import Rule from "./Rule";
import Preview from "./Preview";

const Form = () => {
  const [feedUrl, setFeedUrl] = useState("https://techcrunch.com/feed/");
  const [rules, setRules] = useState([["include", { q: "Google" }]]);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return "";

    const feedUrlParams = new URLSearchParams();
    feedUrlParams.set("url", feedUrl);
    feedUrlParams.set("rules", JSON.stringify(rules));

    const base = `${window.location.protocol}//${window.location.host}/mix`;

    setUrl(`${base}?${feedUrlParams.toString()}`);
  }, [feedUrl, rules]);

  const addRule = () => {
    setRules([...rules, ["exclude", {}]]);
  };

  const updateRule = (index, values) => {
    const newRules = [...rules];
    newRules[index] = values;
    setRules(newRules);
  };

  const removeRule = (index) => {
    const newRules = [...rules];
    newRules.splice(index, 1);
    setRules(newRules);
  };

  return (
    <div className="lg:flex lg:h-screen">
      <div className="p-16 flex justify-center overflow-auto flex-1">
        <main className="prose max-w-3xl flex-1">
          <h1>Feed Fixer</h1>
          <p>
            This tool allows you to enter a{" "}
            <a href="https://en.wikipedia.org/wiki/RSS">RSS feed</a> URL, and
            apply certain rules to it. At the bottom, a new URL will be
            returned, which contains the original feed, but with these rules
            applied.
          </p>
          <hr />
          <h3>Original feed URL</h3>
          <Input
            type="url"
            value={feedUrl}
            onChange={({ target }) => setFeedUrl(target.value)}
            placeholder="https://example.com/feed.rss"
          />

          <h3>Rules</h3>
          <p>Match ALL of the following rules:</p>
          {rules.map((rule, index) => (
            <Rule
              rule={rule}
              updateRule={(r) => updateRule(index, r)}
              removeRule={() => removeRule(index)}
              key={index}
            />
          ))}
          <button onClick={addRule} className="font-semibold text-black">
            Add rule
          </button>
          <hr />

          <h3>Resulting feed URL</h3>
          <pre>{url}</pre>
          <button
            onClick={() => navigator.clipboard.writeText(url)}
            className="font-semibold text-black"
          >
            Copy to clipboard
          </button>
        </main>
      </div>
      <Preview url={url} />
    </div>
  );
};

export default Form;
