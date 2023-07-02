import { Program } from '@/entities/Program'
import { useMemo, useRef } from 'react'

export const useLastCompleted = (program: Program) => {
	const todayDate = new Date().toLocaleDateString()
	const lastCompletedId = useRef(0)

	const objectives: Record<number, number> = useMemo(() => ({}), [])
	const statistics: Record<number, number> = useMemo(() => ({}), [])

	useMemo(
		() =>
			program.objectives?.forEach(obj => {
				if (obj.exercise.id) {
					return (objectives[obj.exercise.id] = obj.targetSets)
				}
			}),
		[objectives, program.objectives]
	)

	useMemo(
		() =>
			program.statistics
				?.filter(
					stat => new Date(stat.createdAt).toLocaleDateString() === todayDate
				)
				.forEach(stat => {
					if (statistics[stat.exercise.id]) {
						return (statistics[stat.exercise.id] += 1)
					}
					return (statistics[stat.exercise.id] = 1)
				}),
		[program.statistics, statistics, todayDate]
	)

	useMemo(() => {
		const keys = Object.keys(objectives)
		for (let i = 0; i < Object.keys(objectives).length; i++) {
			const targetSets = objectives[+keys[i]]
			const currentSets = statistics[+keys[i]] ?? 0

			if (targetSets! !== currentSets) {
				return (lastCompletedId.current = keys.indexOf(keys[i]))
			}
		}
	}, [objectives, statistics])

	return lastCompletedId.current
}
