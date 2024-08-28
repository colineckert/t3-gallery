import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { CreateAlbumModal } from "~/components/create-album-modal";
import { Button } from "~/components/ui/button";
import { getMyAlbums } from "~/server/queries";

export const dynamic = "force-dynamic";

export async function AlbumSidebar() {
  const user = auth();
  const albums = await getMyAlbums();

  if (!user.userId) {
    return null;
  }

  return (
    <div className="z-20 flex w-fit flex-col border-r bg-slate-950 p-4">
      <div className="mb-4 text-lg font-semibold">Albums</div>
      <div className="flex flex-row gap-4">
        <CreateAlbumModal />
      </div>
      <div className="flex flex-col py-3">
        {albums.map((album) => (
          <Button
            asChild
            variant="link"
            className="justify-start"
            key={album.id}
          >
            <Link href={`/albums/${album.id}`}>{album.name}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
