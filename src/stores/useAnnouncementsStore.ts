import { useQuery } from "@tanstack/react-query";
import { resolveApiUrl } from "@/lib/api-url";
import { type APIAnnouncement } from "@/data/announcements";

interface AnnouncementsListResponse {
  data: APIAnnouncement[];
}

async function fetchAnnouncements(page: string): Promise<AnnouncementsListResponse> {
  const queryParams = new URLSearchParams({ page });
  const url = resolveApiUrl(`/api/public/announcements/list?${queryParams.toString()}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des annonces");
  }
  return response.json();
}

export function useAnnouncementsStore(page: string) {
  const query = useQuery({
    queryKey: ["announcements", "public-list", page],
    queryFn: () => fetchAnnouncements(page),
    staleTime: 1000 * 60, // les annonces peuvent changer plus vite qu'une ressource classique
  });

  return {
    announcements: query.data?.data || ([] as APIAnnouncement[]),
    isLoading: query.isLoading,
    isError: query.isError,
  };
}

export type AnnouncementEventType = "view" | "click" | "close";

/**
 * Enregistre un événement d'annonce. Ne doit jamais bloquer l'UI ni remonter
 * d'erreur visible : on avale silencieusement les échecs de tracking.
 */
export async function trackAnnouncementEvent(
  id: string,
  eventType: AnnouncementEventType,
  page: string,
  visitorId: string
): Promise<void> {
  const formData = new FormData();
  formData.append("event_type", eventType);
  formData.append("page", page);
  formData.append("visitor_id", visitorId);

  try {
    const url = resolveApiUrl(`/api/public/announcements/${id}/events`);
    await fetch(url, { method: "POST", body: formData });
  } catch {
    // silencieux : le tracking n'est pas critique pour l'utilisateur
  }
}