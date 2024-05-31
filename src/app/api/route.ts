import { NextRequest, NextResponse } from "next/server";
import { Item } from "@/models/Item";

const maxItems = 50;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const offset = Number(searchParams.get('offset')) || 0
  const limit = Number(searchParams.get('limit')) || 10

  let items: Item[] = [];
  for (let i: number = offset; i < offset + limit && i < maxItems; i++) {
    items = [...items, { id: i + 1 }]
  }

  const hasNext = items.length > 0 && items[items.length - 1].id < maxItems

  // ローディングを確認するために1秒待つ
  await sleep(1000)

  return NextResponse.json({ items, hasNext });
}

function sleep(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}