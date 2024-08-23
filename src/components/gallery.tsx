"use client";

import Link from "next/link";
import Image from "next/image";
import { useGalleryStore } from "~/providers/gallery-store-provider";
import { type GalleryImage } from "~/server/db/schema";

export function ImageGallery({ images }: { images: GalleryImage[] }) {
  const { selectedImages, add, remove, clear } = useGalleryStore(
    (state) => state,
  );
  console.log({ selectedImages, add, remove, clear });

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
