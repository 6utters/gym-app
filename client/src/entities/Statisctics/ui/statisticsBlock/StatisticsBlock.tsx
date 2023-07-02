import { FC, useEffect, useMemo } from 'react'
import { useGetStatistics } from '@/pages/programExercisePage'

import {
	DayProgress,
	statisticsActions,
	StatisticsDayBlock
} from '@/entities/Statisctics'

import styles from './StatisticsBlock.module.scss'
import { useDispatch } from 'react-redux'

interface StatisticsBlockProps {
	exerciseId: number
	programId: number
}

export const StatisticsBlock: FC<StatisticsBlockProps> = props => {
	const { programId, exerciseId } = props
	const dispatch = useDispatch()

	const { data: statistics } = useGetStatistics(
		{ exerciseId, programId },
		{ skip: !exerciseId || !programId }
	)

	const dayRepetitions = useMemo(
		() =>
			statistics?.reduce<DayProgress>((acc, stat) => {
				const date = new Date(stat.createdAt)
				const dateString = date.toLocaleDateString()
				const time = date.toLocaleTimeString().replace(/(:\d{2}| [AP]M)$/, '')
				if (!acc[dateString]) {
					acc[dateString] = [[stat.repetitions, time]]
				} else {
					acc[dateString].push([stat.repetitions, time])
				}
				return acc
			}, {}),
		[statistics]
	)

	useEffect(() => {
		dispatch(statisticsActions.setDayProgress(dayRepetitions || {}))
	}, [dayRepetitions, dispatch])

	if (!dayRepetitions) {
		return null
	}

	return (
		<div className={styles.statistics_block}>
			<div className={styles.title}>
				<h2>History</h2>
			</div>
			{Object.keys(dayRepetitions)
				.reverse()
				.map(date => (
					<StatisticsDayBlock
						dateString={date}
						key={date}
						progressBlocks={dayRepetitions[date]}
					/>
				))}
		</div>
	)
}
