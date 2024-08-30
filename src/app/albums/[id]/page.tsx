import { ImageList } from "~/components/image-list";
import { getAlbumImages, getMyAlbums } from "~/server/queries";

export default async function AlbumPage({
  params: { id: albumId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(albumId);
  if (Number.isNaN(idAsNumber)) {
    throw new Error("Invalid Album ID");
  }
  const images = await getAlbumImages(idAsNumber);
  const albums = await getMyAlbums();
  const albumName = albums.find((album) => album.id === idAsNumber)?.name;

  return (
    <>
      <h1 className="w-full p-4 text-2xl font-semibold">
        {albumName ?? "Album"}
      </h1>
      <ImageList images={images} albums={albums} />
    </>
  );
}
