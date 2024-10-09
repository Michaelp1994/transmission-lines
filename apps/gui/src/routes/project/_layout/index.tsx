import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/project/_layout/')({
  component: () => <div>Hello /project/_layout/!</div>,
})
