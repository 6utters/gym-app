import { FC, useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './ObjectivesBlock.module.scss'
import { convertTime } from '@/shared/lib'
import { CircularProgressBar } from '@/shared/ui/circularProgressBar/CircularProgressBar'
import { Objective } from '@/entities/Objective'

interface ObjectivesBlockProps {
	className?: string
	objective?: Objective
	todayProgress: [number, string][]
}

export const ObjectivesBlock: FC<ObjectivesBlockProps> = props => {
	const { className, objective, todayProgress } = props

	const [currentSets, setCurrentSets] = useState(0)

	useEffect(() => {
		setCurrentSets(todayProgress.length)
	}, [todayProgress])

	if (!objective) {
		return <div>loading</div>
	}

	const setsPercentage = (currentSets * 100) / objective.targetSets

	return (
		<div className={cn(styles.objectives_block, className)}>
			<div className={styles.reps}>
				<div className={styles.reps_progress}>
					<h3>{objective.targetReps}</h3>
				</div>
				<p>Reps</p>
			</div>
			<div className={styles.rest}>
				<div className={styles.rest_progress}>
					<h3>{convertTime(objective.timeout)}</h3>
				</div>
				<p>Rest</p>
			</div>
			<div className={styles.sets}>
				<CircularProgressBar
					className={styles.sets_progress}
					circleWidth={45}
					percentage={setsPercentage > 100 ? 100 : setsPercentage}
					stats={`${currentSets}/${objective.targetSets}`}
				/>
				<p>Sets made</p>
			</div>
		</div>
	)
}
