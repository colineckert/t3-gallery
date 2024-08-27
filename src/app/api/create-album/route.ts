import { NextResponse } from "next/server";
import { addAlbum } from "~/server/queries";

export async function POST(request: Request) {
  try {
    const { name } = (await request.json()) as { name: string };
    const album = await addAlbum(name);
    return NextResponse.json(album);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create album" },
      { status: 500 },
    );
  }
}
