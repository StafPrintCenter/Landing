import { createFileRoute, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { SITE } from "@/data/site";
import { fetchReviewByToken } from "@/stores/useReviewsStore";
import { ReviewHeader, ReviewForm, ReviewNotFoundState } from "@/components/pages/reviews";

export const Route = createFileRoute("/reviews/$token")({
  head: () => ({
    meta: [
      { title: `Donnez votre avis | ${SITE.name}` },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ReviewPage,
});

function ReviewPage() {
  const { token } = useParams({ from: "/reviews/$token" });

  const { data: invitation, isLoading, isError } = useQuery({
    queryKey: ["reviews", "by-token", token],
    queryFn: () => fetchReviewByToken(token),
    staleTime: 1000 * 60,
    retry: false,
  });

  return (
    <SiteShell>
      <section className="container-x max-w-5xl py-16 md:py-24">
        {isLoading ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center text-sm text-muted-foreground">
            <Loader2 size={24} className="animate-spin" />
            Chargement du formulaire…
          </div>
        ) : isError || !invitation ? (
          <ReviewNotFoundState />
        ) : (
          <>
            <ReviewHeader title={invitation.form.title} description={invitation.form.description} />
            <div className="mt-10">
              <ReviewForm token={token} form={invitation.form} client={invitation.client} />
            </div>
          </>
        )}
      </section>
    </SiteShell>
  );
}