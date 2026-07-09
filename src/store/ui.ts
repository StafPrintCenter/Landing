import { create } from "zustand";

type UIState = {
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  toggleMobile: () => void;
  projectFilter: string;
  setProjectFilter: (v: string) => void;
  lightboxIndex: number | null;
  openLightbox: (i: number) => void;
  closeLightbox: () => void;
  setLightboxIndex: (i: number) => void;
};

export const useUI = create<UIState>((set) => ({
  mobileOpen: false,
  setMobileOpen: (v) => set({ mobileOpen: v }),
  toggleMobile: () => set((s) => ({ mobileOpen: !s.mobileOpen })),
  projectFilter: "Tout",
  setProjectFilter: (v) => set({ projectFilter: v }),
  lightboxIndex: null,
  openLightbox: (i) => set({ lightboxIndex: i }),
  closeLightbox: () => set({ lightboxIndex: null }),
  setLightboxIndex: (i) => set({ lightboxIndex: i }),
}));