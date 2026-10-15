import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/verify-certificate/$number')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/verify-certificate/$number"!</div>
}
