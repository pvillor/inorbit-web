import { Plus } from 'lucide-react'
import { OutlineButton } from './ui/outline-button'
import { useQueryClient } from '@tanstack/react-query'
import {
  getGetPendingGoalsQueryKey,
  getGetUserLevelAndExperienceQueryKey,
  getGetWeekSummaryQueryKey,
  useCreateCompletion,
  useGetPendingGoals,
} from '../http/generated/api'

export function PendingGoals() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useGetPendingGoals()

  const { mutateAsync: createGoalCompletion } = useCreateCompletion()

  if (isLoading || !data) {
    return null
  }

  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion({ data: { goalId } })

    queryClient.invalidateQueries({ queryKey: getGetWeekSummaryQueryKey() })
    queryClient.invalidateQueries({ queryKey: getGetPendingGoalsQueryKey() })
    queryClient.invalidateQueries({
      queryKey: getGetUserLevelAndExperienceQueryKey(),
    })
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.pendingGoals.map(goal => {
        return (
          <OutlineButton
            key={goal.id}
            disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
            onClick={() => handleCompleteGoal(goal.id)}
          >
            <Plus className="size-4 text-zinc-600" />
            {goal.title}
          </OutlineButton>
        )
      })}
    </div>
  )
}
