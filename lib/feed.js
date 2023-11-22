import { ruleTypes } from "./rules";
import { extract } from "@extractus/feed-extractor";
import { Feed } from "feed";

export const buildFeed = async (url, rules, id = undefined) => {
  // Get original feed
  let data;
  try {
    data = await extract(url);
  } catch (error) {
    throw new Error(`Could not get feed. ${error.message}.`);
  }

  const feed = new Feed({
    ...data,
    description: id ? `${data.description || ''}${data.description ? ' - ' : ''}Edit feed: https://feedfixer.xyz/edit/${id}` : data.description,
  });

  // Apply rules
  for (const item of data.entries) {
    let include = !rules.some(([type]) => type.includes("include"));
    let exclude = false;
    for (const [type, fields] of rules) {
      const ruleType = ruleTypes.find((ruleType) => ruleType.id === type);
      if (!ruleType) continue;
      const result = ruleType.condition(item, fields);
      if (ruleType.id.includes("exclude")) {
        exclude = exclude || !result;
      } else {
        include = include || result;
      }
    }

    if (!include || exclude) continue;

    feed.addItem({
      ...item,
      published: new Date(item.published || new Date()),
    });
  }

  return feed;
};
