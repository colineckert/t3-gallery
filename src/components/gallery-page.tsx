"use client";

import { useGalleryStore } from "~/providers/gallery-store-provider";
import { ImageGallery } from "./gallery";
import { Button } from "./ui/button";

export default function GalleryPage() {
  const { selectedImages } = useGalleryStore((state) => state);

  return (
    <div>
      <Button className="pb-10" onClick={() => console.log({ selectedImages })}>
        TEST
      </Button>
      <ImageGallery />
    </div>
  );
}
