import { type NextRequest, NextResponse } from "next/server";
import { addImageToAlbum } from "~/server/queries";

export async function POST(req: NextRequest) {
  const { albumId, imageIds } = (await req.json()) as {
    albumId: number;
    imageIds: number[];
  };

  try {
    const promises = imageIds.map((imageId) =>
      addImageToAlbum(albumId, imageId),
    );
    await Promise.all(promises);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add image to album" },
      { status: 500 },
    );
  }
}
