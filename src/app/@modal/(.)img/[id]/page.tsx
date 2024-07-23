import { getImage } from "~/server/queries";

export default async function PhotoModal({
  params: { id: imageId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(imageId);
  if (Number.isNaN(idAsNumber)) {
    throw new Error("Invalid photo ID");
  }

  const image = await getImage(idAsNumber);

  return (
    <div>
      <img className="w-96" src={image.url} alt={image.name} />
    </div>
  );
}
