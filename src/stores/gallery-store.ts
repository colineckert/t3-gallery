import { createStore } from "zustand/vanilla";

export type GalleryState = {
  selectedImages: number[];
};

export type GalleryActions = {
  add: (imageId: number) => void;
  remove: (imageId: number) => void;
  clear: () => void;
};

export type GalleryStore = GalleryState & GalleryActions;

export const initGalleryStore = (): GalleryState => {
  return { selectedImages: [] };
};

export const defaultInitState: GalleryState = {
  selectedImages: [],
};

export const createGalleryStore = (
  initState: GalleryState = defaultInitState,
) => {
  return createStore<GalleryStore>()((set) => ({
    ...initState,
    add: (imageId) =>
      set((state) => ({ selectedImages: [...state.selectedImages, imageId] })),
    remove: (imageId) =>
      set((state) => ({
        selectedImages: state.selectedImages.filter((id) => id !== imageId),
      })),
    clear: () => set({ selectedImages: [] }),
  }));
};
