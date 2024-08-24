"use client";

import Link from "next/link";
import Image from "next/image";
import { useGalleryStore } from "~/providers/gallery-store-provider";
import { type GalleryImage } from "~/server/db/schema";
import { Button } from "./ui/button";

export function ImageGallery({ images }: { images: GalleryImage[] }) {
  const { selectedImages, add, remove, clear } = useGalleryStore(
    (state) => state,
  );

  function toggleSelectImage(id: number) {
    if (selectedImages.includes(id)) {
      remove(id);
    } else {
      add(id);
    }
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {[...images, ...images, ...images, ...images, ...images, ...images].map(
        (image) => (
          <div
            key={image.id}
            className={`flex h-44 w-48 flex-col justify-between rounded-md p-1
            ${selectedImages.includes(image.id) && "border-2 border-blue-500"}`}
          >
            <Link href={`/img/${image.id}`}>
              <Image
                src={image.url}
                alt={image.name}
                style={{ objectFit: "contain" }}
                width={192}
                height={192}
              />
            </Link>
            <Button
              className="bg-dark text-white hover:bg-white/90 hover:text-slate-950"
              onClick={() => toggleSelectImage(image.id)}
            >
              {image.name}
            </Button>
          </div>
        ),
      )}
      {selectedImages.length ? (
        <div className="fixed bottom-0 z-10 flex w-full justify-end border-t-2 bg-slate-950 p-3">
          <Button
            variant="destructive"
            onClick={clear}
          >{`Delete ${selectedImages.length} images`}</Button>
        </div>
      ) : null}
    </div>
  );
}
