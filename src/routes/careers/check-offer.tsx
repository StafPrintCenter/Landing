import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/careers/check-offer')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/careers/offers/check"!</div>
}
