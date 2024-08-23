import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ImageGallery } from "~/components/gallery";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main>
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <ImageGallery />
      </SignedIn>
    </main>
  );
}
