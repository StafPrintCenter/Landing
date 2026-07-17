import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tools/newsletter/preferences')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tools/newsletter/preferences"!</div>
}
