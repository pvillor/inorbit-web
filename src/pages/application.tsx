import { Dialog } from '../components/ui/dialog'
import { CreateGoal } from '../components/create-goal'
import { WeeklySummary } from '../components/summary'
import { useGetWeekSummary } from '../http/generated/api'
import { Loader2 } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import dayjs from 'dayjs'

export function Application() {
  const [searchParams] = useSearchParams()
  const weekStartsAtParams = searchParams.get('week_starts_at')

  const weekStartsAt = weekStartsAtParams
    ? new Date(weekStartsAtParams)
    : new Date()

  const { data, isLoading } = useGetWeekSummary({
    weekStartsAt: dayjs(weekStartsAt).startOf('week').toISOString(),
  })

  if (isLoading || !data) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="text-zinc-500 animate-spin size-10" />
      </div>
    )
  }

  return (
    <Dialog>
      <WeeklySummary summary={data.summary} />

      <CreateGoal />
    </Dialog>
  )
}
