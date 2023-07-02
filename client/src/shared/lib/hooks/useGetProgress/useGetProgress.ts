import { Program } from '@/entities/Program'
import { useMemo } from 'react'

export const useGetProgress = (program: Program) => {
	const todayDate = new Date().toLocaleDateString()

	const targetObjectives = useMemo(
		() =>
			program.objectives &&
			program.objectives.reduce((acc, objective) => {
				const exerciseObjective = objective.targetSets * objective.targetReps
				return acc + exerciseObjective
			}, 0),
		[program.objectives]
	)

	const todayStatistics = useMemo(
		() =>
			program.statistics &&
			program.statistics.filter(stat => {
				const date = new Date(stat.createdAt)
				const dateString = date.toLocaleDateString()
				return dateString == todayDate
			}),
		[program.statistics, todayDate]
	)

	const targetSets = useMemo(
		() =>
			program.objectives &&
			program.objectives.reduce((acc, objective) => {
				return acc + objective.targetSets
			}, 0),
		[program.objectives]
	)

	const todayProgress = useMemo(
		() =>
			todayStatistics?.reduce((acc, stat) => {
				const exerciseProgress = stat.repetitions
				return acc + exerciseProgress
			}, 0),
		[todayStatistics]
	)

	const progressPercentage = useMemo(() => {
		const progress = Math.floor(
			((todayProgress || 0) * 100) / (targetObjectives || 0)
		)
		return progress > 100 ? 100 : progress
	}, [targetObjectives, todayProgress])

	return {
		targetObjectives,
		todayProgress,
		todayStatistics,
		progressPercentage,
		targetSets
	}
}
