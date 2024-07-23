import FullPageImageView from "~/components/full-image-page";

export default async function PhotoModal({
  params: { id: imageId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(imageId);
  if (Number.isNaN(idAsNumber)) {
    throw new Error("Invalid photo ID");
  }

  return <FullPageImageView id={idAsNumber} />;
}
