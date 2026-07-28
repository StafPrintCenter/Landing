import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/careers/internships/check')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/careers/internships/check"!</div>
}
