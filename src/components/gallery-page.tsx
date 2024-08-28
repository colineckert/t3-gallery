import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ImageList } from "~/components/image-list";
import type { GalleryAlbum, GalleryImage } from "~/server/db/schema";
import { getMyAlbums, getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

export async function GalleryPage() {
  let images: GalleryImage[] | null = [];
  let albums: GalleryAlbum[] | null = [];

  try {
    images = await getMyImages();
    albums = await getMyAlbums();
    console.log({ images, albums });
  } catch (error) {
    // @ts-expect-error query error handling
    if (error.message === "Unauthorized") {
      images = null;
      albums = null;
    } else {
      console.error(error);
      images = null;
      albums = null;
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
        <ImageList images={images} albums={albums} />
      </SignedIn>
    </main>
  );
}
