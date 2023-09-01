import { NextResponse } from "next/server";
import { extract } from "@extractus/feed-extractor";
import { Feed } from "feed";
import { ruleTypes } from "@/lib/rules";

export const GET = async (request) => {
  // Input parsing and validation
  const { searchParams } = new URL(request.url);
  if (!searchParams.get("url") || !searchParams.get("rules")) {
    return NextResponse.json(
      { error: "url and rules are required" },
      { status: 400 }
    );
  }
  const url = searchParams.get("url");
  const rules = JSON.parse(searchParams.get("rules"));
  if (!Array.isArray(rules)) {
    return NextResponse.json(
      { error: "rules must be an array" },
      { status: 400 }
    );
  }

  const json = searchParams.get("format") === "json";

  // Get original feed
  let data;
  try {
    data = await extract(url);
  } catch (error) {
    return NextResponse.json(
      { error: `Could not get feed. ${error.message}.` },
      { status: 400 }
    );
  }

  const feed = new Feed(data);

  // Apply rules
  for (const item of data.entries) {
    let include = true;
    for (const [type, fields] of rules) {
      const ruleType = ruleTypes.find((ruleType) => ruleType.id === type);
      if (!ruleType || !include) continue;
      include = ruleType.condition(item, fields);
    }

    if (!include) continue;

    feed.addItem({
      ...item,
      published: new Date(item.published || new Date()),
    });
  }

  const headers = new Headers();
  headers.set(
    "Content-Type",
    json ? "application/json" : "application/rss+xml"
  );

  return new NextResponse(json ? feed.json1() : feed.rss2(), { headers });
};
