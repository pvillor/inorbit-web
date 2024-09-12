import { Dialog } from './components/ui/dialog'
import { CreateGoal } from './components/create-goal'
import { Summary } from './components/summary'
import { EmptyGoals } from './components/empty-goals'
import { useQuery } from '@tanstack/react-query'
import { getSummary } from './http/get-summary'

export function App() {
  const { data: summary } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
  })

  const isSummaryNotEmpty = summary?.total && summary.total > 0

  return (
    <Dialog>
      {isSummaryNotEmpty ? <Summary /> : <EmptyGoals />}
      <CreateGoal />
    </Dialog>
  )
}
