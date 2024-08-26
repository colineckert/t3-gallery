"use client";

import { useState } from "react";
import { FolderPlus } from "lucide-react";
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
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CreateAlbumModal({
  createAlbum,
}: {
  createAlbum: (name: string) => void;
}) {
  const router = useRouter();
  const [albumName, setAlbumName] = useState("Sick Pics");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FolderPlus className="mr-2 h-4 w-4" />
          Create Album
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Album</DialogTitle>
          <DialogDescription>
            Create a new album to organize your images
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={albumName}
              onChange={(e) => setAlbumName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              onClick={() => {
                try {
                  createAlbum(albumName);
                  toast(`${albumName} album created successfully`);
                  router.refresh();
                } catch (error) {
                  console.error("Error:", error);
                }
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
