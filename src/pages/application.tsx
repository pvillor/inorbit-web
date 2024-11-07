import { Dialog } from '../components/ui/dialog'
import { CreateGoal } from '../components/create-goal'
import { WeeklySummary } from '../components/summary'
import { EmptyGoals } from '../components/empty-goals'
import { useGetWeekSummary } from '../http/generated/api'
import { Loader2 } from 'lucide-react'

export function Application() {
  const { data, isLoading } = useGetWeekSummary()

  if (isLoading || !data) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="text-zinc-500 animate-spin size-10" />
      </div>
    )
  }

  const isSummaryNotEmpty = data.summary?.total && data.summary.total > 0

  return (
    <Dialog>
      {isSummaryNotEmpty ? (
        <WeeklySummary summary={data.summary} />
      ) : (
        <EmptyGoals />
      )}
      <CreateGoal />
    </Dialog>
  )
}
