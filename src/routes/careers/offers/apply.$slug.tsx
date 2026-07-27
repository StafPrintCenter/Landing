import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/careers/offers/apply/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/careers/offers/apply/$slug"!</div>
}
