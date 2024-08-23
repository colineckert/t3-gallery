import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Gallery } from "~/components/gallery";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main>
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <Gallery />
      </SignedIn>
    </main>
  );
}
