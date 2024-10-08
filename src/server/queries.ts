import "server-only";
import { db } from "~/server/db";
import { auth } from "@clerk/nextjs/server";
import { albumImages, albums, images } from "./db/schema";
import { and, eq } from "drizzle-orm";

export async function getMyImages() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });

  return images;
}

export async function getImage(id: number) {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) throw new Error("Image not found");

  if (image.userId !== user.userId) throw new Error("Unauthorized");

  return image;
}

export async function deleteImage(id: number) {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));
}

export async function addAlbum(name: string) {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const album = await db.insert(albums).values({
    name,
    userId: user.userId,
  });

  return album;
}

export async function getMyAlbums() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const albums = await db.query.albums.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });

  return albums;
}

export async function addImageToAlbum(albumId: number, imageId: number) {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const existingRecord = await db.query.albumImages.findFirst({
    where: (model, { and, eq }) =>
      and(eq(model.albumId, albumId), eq(model.imageId, imageId)),
  });

  if (!existingRecord) {
    await db.insert(albumImages).values({
      albumId,
      imageId,
    });
  }
}

export async function updateImageAlbum(imageId: number, newAlbumId: number) {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  await db
    .update(albumImages)
    .set({
      albumId: newAlbumId,
    })
    .where(eq(albumImages.imageId, imageId));
}

export async function getAlbumImages(albumId: number) {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const imageIds = await db.query.albumImages.findMany({
    where: (model, { eq }) => eq(model.albumId, albumId),
  });

  if (!imageIds.length) return [];

  const images = await db.query.images.findMany({
    where: (model, { inArray }) =>
      inArray(
        model.id,
        imageIds.map((image) => image.imageId),
      ),
  });

  return images;
}
