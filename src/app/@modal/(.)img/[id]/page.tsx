import { getImage } from "~/server/queries";
import { Modal } from "./modal";

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
    <Modal>
      <img className="w-96" src={image.url} alt={image.name} />
    </Modal>
  );
}
