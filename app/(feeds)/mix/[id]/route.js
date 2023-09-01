import { NextResponse } from "next/server";
import { buildFeed } from "@/lib/feed";
import { getItem } from "@/lib/api";

export const GET = async (request, { params: { id } }) => {
  // Get configuration
  const ruleset = await getItem(id);
  if (!ruleset) {
    return NextResponse.json(
      { error: `Could not get ruleset.` },
      { status: 400 }
    );
  }

  // Build feed
  let feed;
  try {
    const { url, rules } = ruleset;
    feed = await buildFeed(url, rules, id);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Build response
  const { searchParams } = new URL(request.url);
  const json = searchParams.get("format") === "json";
  const headers = new Headers();
  headers.set(
    "Content-Type",
    json ? "application/json" : "application/rss+xml"
  );

  return new NextResponse(json ? feed.json1() : feed.rss2(), { headers });
};
