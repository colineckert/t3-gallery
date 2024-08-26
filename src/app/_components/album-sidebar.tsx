import { auth } from "@clerk/nextjs/server";
import { FolderPlus } from "lucide-react";
import { Button } from "~/components/ui/button";

export function AlbumSidebar() {
  const user = auth();

  // if not signed in, show nothing
  if (!user.userId) {
    return null;
  }

  // if signed in, show left nav with album list and create album button
  return (
    <div className="flex w-fit flex-col border-r p-4">
      <div className="mb-4 text-xl font-semibold">Albums</div>
      <div className="flex flex-row gap-4">
        <Button variant="outline">
          <FolderPlus className="mr-2 h-4 w-4" />
          Create Album
        </Button>
      </div>
    </div>
  );
}
