import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { GalleryAlbum } from "~/server/db/schema";

export function AddToAlbumButton({
  albums,
  imageIds,
}: {
  albums: GalleryAlbum[] | null;
  imageIds: number[];
}) {
  if (!albums) {
    return null;
  }

  const addImagesToAlbum = async (albumId: number) => {
    try {
      const response = await fetch("/api/add-images-to-album", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ albumId, imageIds }),
      });

      if (!response.ok) {
        throw new Error("Failed to add image to album");
      }

      const result = (await response.json()) as Promise<{ status: number }>;
      return result;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Add to Album" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Albums</SelectLabel>
          {albums.map((album) => (
            <SelectItem
              key={album.id}
              value={String(album.id)}
              onClick={async () => {
                try {
                  await addImagesToAlbum(album.id);
                } catch (error) {
                  console.error("Error:", error);
                }
              }}
            >
              {album.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
