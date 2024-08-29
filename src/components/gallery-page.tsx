import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ImageList } from "~/components/image-list";
import { getMyAlbums, getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

export async function GalleryPage() {
  const images = await getMyImages();
  const albums = await getMyAlbums();

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
