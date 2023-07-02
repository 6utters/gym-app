import { FC } from 'react'

import styles from './StatisticsDayBlock.module.scss'

interface StatisticsDayBlockProps {
	dateString: string
	progressBlocks: [number, string][]
}

export const StatisticsDayBlock: FC<StatisticsDayBlockProps> = props => {
	const { dateString, progressBlocks } = props

	return (
		<div className={styles.statistics_day}>
			<div className={styles.date}>
				<h2>{dateString}</h2>
			</div>
			<div className={styles.progress}>
				{progressBlocks.map(([repetitions, timeBlock], index) => (
					<div key={index} className={styles.progress_block}>
						<div className={styles.left_side}>
							<div className={styles.index}>
								<span>#{index + 1}</span>
							</div>
							<div className={styles.reps}>
								<span>{repetitions} reps</span>
							</div>
						</div>
						<div className={styles.time_progress}>
							<span>{timeBlock}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
