export default async function AlbumPage({
  params: { id: albumId },
}: {
  params: { id: string };
}) {
  return <div>{albumId} ALBUM PAGE</div>;
}
