import { createStore } from "zustand/vanilla";

export type GalleryState = {
  images: string[];
};

export type GalleryActions = {
  add: (imageId: string) => void;
  remove: (imageId: string) => void;
  clear: () => void;
};

export type GalleryStore = GalleryState & GalleryActions;

export const initGalleryStore = (): GalleryState => {
  return { images: [] };
};

export const defaultInitState: GalleryState = {
  images: [],
};

export const createGalleryStore = (
  initState: GalleryState = defaultInitState,
) => {
  return createStore<GalleryStore>()((set) => ({
    ...initState,
    add: (imageId) => set((state) => ({ images: [...state.images, imageId] })),
    remove: (imageId) =>
      set((state) => ({ images: state.images.filter((id) => id !== imageId) })),
    clear: () => set({ images: [] }),
  }));
};
