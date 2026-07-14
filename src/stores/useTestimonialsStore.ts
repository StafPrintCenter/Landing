import { createResourceStore } from "./createResourceStore";
import { type APITestimonial } from "@/data/testimonials";

const { fetchList, useResourceStore } = createResourceStore<APITestimonial>({
  resourceKey: "testimonials",
  listEndpoint: "testimonials",
});

export const fetchPublicTestimonials = fetchList;

export function useTestimonialsStore(params: Parameters<typeof useResourceStore>[0] = {}) {
  const { data, ...rest } = useResourceStore(params);
  return { testimonials: data, ...rest };
}