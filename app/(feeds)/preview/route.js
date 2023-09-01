import { NextResponse } from "next/server";
import { buildFeed } from "@/lib/feed";

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

  // Build feed
  let feed;
  try {
    feed = await buildFeed(url, rules);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  return new NextResponse(feed.json1(), { headers });
};
