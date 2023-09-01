"use client";

import React, { useEffect, useState } from "react";

import Input from "./Input";
import Rule from "./Rule";
import Preview from "./Preview";
import { saveItem } from "@/lib/api";
import CopyableText from "./CopyableText";

const Form = (props) => {
  const [feedUrl, setFeedUrl] = useState(
    props.url || "https://techcrunch.com/feed/"
  );
  const [rules, setRules] = useState(
    props.rules || [["include", { q: "Google" }]]
  );
  const [id, setId] = useState(props.id || undefined);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

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

  const save = async () => {
    setLoading(true);
    const key = await saveItem({ url: feedUrl, rules }, id);
    if (key !== props.id) {
      window.history.replaceState({}, "", `/edit/${key}`);
    }
    setId(key);
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      setUrl(`${window.location.origin}/mix/${id}`);
    }
  }, [id, setUrl]);

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

          {url ? (
            <div className="rounded-md bg-green-100 border border-green-200 p-8 mt-4">
              <h4 className="mt-0 mb-4">Your private feed URL</h4>
              <CopyableText text={url} />
            </div>
          ) : (
            <hr />
          )}

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

          <button
            onClick={save}
            disabled={loading}
            className="font-semibold text-white bg-gray-900 rounded-md px-4 py-2 mb-20"
          >
            {loading
              ? "Saving..."
              : id
              ? "Update feed rules"
              : "Generate feed URL"}
          </button>
        </main>
      </div>
      <Preview url={feedUrl} rules={rules} />
    </div>
  );
};

export default Form;
