import { getMyImages } from "~/server/queries";
import Image from "next/image";
import Link from "next/link";

export async function ImageList() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {images.map((image) => (
        <div key={image.id} className="flex h-48 w-48 flex-col">
          <Link href={`/img/${image.id}`}>
            <Image
              src={image.url}
              alt={image.name}
              style={{ objectFit: "contain" }}
              width={192}
              height={192}
            />
          </Link>
          <div>{image.name}</div>
        </div>
      ))}
    </div>
  );
}
