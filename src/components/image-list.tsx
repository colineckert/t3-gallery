"use client";

import Link from "next/link";
import Image from "next/image";
import { useGalleryStore } from "~/providers/gallery-store-provider";
import type { GalleryAlbum, GalleryImage } from "~/server/db/schema";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AddToAlbumButton } from "./add-album-button";

export function ImageList({
  images,
  albums,
}: {
  images: GalleryImage[];
  albums: GalleryAlbum[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { selectedImages, add, remove, clear } = useGalleryStore(
    (state) => state,
  );

  async function handleDeleteImages(ids: number[]) {
    setLoading(true);
    try {
      const response = await fetch("/api/delete-images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids }),
      });
      if (response.ok) {
        toast("Images successfully deleted");
        console.log("Images deleted");
        clear();
      } else {
        toast("Failed to delete images");
        console.error("Failed to delete images:");
        clear();
        router.refresh();
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  function toggleSelectImage(id: number) {
    if (selectedImages.includes(id)) {
      remove(id);
    } else {
      add(id);
    }
  }

  if (!images || images.length === 0) {
    return (
      <div className="flex w-full justify-center p-4">No images to display</div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {images.map((image) => (
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
            size="sm"
            variant="ghost"
            onClick={() => toggleSelectImage(image.id)}
          >
            {image.name}
          </Button>
        </div>
      ))}
      {selectedImages.length ? (
        <div className="fixed bottom-0 left-0 z-10 flex w-full justify-end border-t-2 bg-slate-950 p-3">
          <AddToAlbumButton albums={albums} imageIds={selectedImages} />
          <Button
            className="ml-2"
            variant="destructive"
            onClick={() => handleDeleteImages(selectedImages)}
            disabled={loading}
          >{`Delete ${selectedImages.length} Images`}</Button>
          <Button className="ml-2" variant="secondary" onClick={clear}>
            Cancel
          </Button>
        </div>
      ) : null}
    </div>
  );
}
