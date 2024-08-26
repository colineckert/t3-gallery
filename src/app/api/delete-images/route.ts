import { type NextRequest, NextResponse } from "next/server";
import { deleteImage } from "~/server/queries";

export async function POST(req: NextRequest) {
  const { ids } = (await req.json()) as { ids: number[] };
  console.log("Deleting images with ids:", ids);

  if (!Array.isArray(ids)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const promises = ids.map((id: number) => deleteImage(id));
    await Promise.all(promises);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting images:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: "Failed to delete images",
          details: error.message,
          stack: error.stack,
        },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { error: "Failed to delete images" },
      { status: 500 },
    );
  }
}
