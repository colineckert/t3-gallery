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
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import type { GalleryAlbum } from "~/server/db/schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGalleryStore } from "~/providers/gallery-store-provider";

export function AddToAlbumButton({
  albums,
  imageIds,
}: {
  albums: GalleryAlbum[] | null;
  imageIds: number[];
}) {
  const router = useRouter();
  const { clear } = useGalleryStore((state) => state);
  const [albumId, setAlbumId] = useState<number>();

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
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add to Album</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Images to Album</DialogTitle>
          <DialogDescription>
            Organize your images by adding them to an album
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Select onValueChange={(idValue) => setAlbumId(Number(idValue))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Add to Album" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Albums</SelectLabel>
                  {albums.map((album) => (
                    <SelectItem key={album.id} value={String(album.id)}>
                      {album.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              disabled={!albumId}
              onClick={async () => {
                if (!albumId) return;
                await addImagesToAlbum(albumId);
                toast("Images added to album successfully");
                clear();
                router.refresh();
              }}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
