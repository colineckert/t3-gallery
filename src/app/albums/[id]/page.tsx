import { ImageList } from "~/components/image-list";
import { getAlbumImages } from "~/server/queries";

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
  console.log({ images });

  return <ImageList images={images} />;
}
