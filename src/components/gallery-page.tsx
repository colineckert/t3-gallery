import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ImageList } from "~/components/image-list";
import type { GalleryImage } from "~/server/db/schema";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

export async function GalleryPage() {
  let images: GalleryImage[] | null = [];

  try {
    images = await getMyImages();
  } catch (error) {
    // @ts-expect-error query error handling
    if (error.message === "Unauthorized") {
      images = null;
    } else {
      console.error(error);
      images = null;
    }
  }

  return (
    <main>
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <ImageList images={images} />
      </SignedIn>
    </main>
  );
}
