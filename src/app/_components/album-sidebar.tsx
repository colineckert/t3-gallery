import { auth } from "@clerk/nextjs/server";
import { CreateAlbumModal } from "~/components/create-album-modal";
import { Button } from "~/components/ui/button";
import { addAlbum, getMyAlbums } from "~/server/queries";

export const dynamic = "force-dynamic";

export async function AlbumSidebar() {
  const user = auth();
  const albums = await getMyAlbums();

  // if not signed in, show nothing
  if (!user.userId) {
    return null;
  }

  const handleCreateAlbum = async (albumName: string) => {
    "use server";
    await addAlbum(albumName);
  };

  // if signed in, show left nav with album list and create album button
  return (
    <div className="z-20 flex w-fit flex-col border-r bg-slate-950 p-4">
      <div className="mb-4 text-lg font-semibold">Albums</div>
      <div className="flex flex-row gap-4">
        <CreateAlbumModal createAlbum={handleCreateAlbum} />
      </div>
      <div className="flex flex-col py-3">
        {albums.map((album) => (
          <Button variant="link" className="justify-start" key={album.id}>
            {album.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
