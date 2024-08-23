import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ImageGallery } from "~/components/gallery";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await getMyImages();

  return (
    <main>
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <ImageGallery images={images} />
      </SignedIn>
    </main>
  );
}
