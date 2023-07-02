import { FC, memo, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { Modal } from '@/shared/ui/modals/Modal'
import { Button, CircularProgressBar } from '@/shared/ui'
import styles from './Timeout.module.scss'

interface TimeoutProps {
	className?: string
	time: number
	isStarted: boolean
	onClose: () => void
}

export const Timeout: FC<TimeoutProps> = memo(props => {
	const { className, onClose, time, isStarted } = props
	const [countDown, setCountDown] = useState(time / 1000)
	const timerRef = useRef<ReturnType<typeof setInterval>>()

	useEffect(() => {
		if (isStarted) {
			timerRef.current = setInterval(() => {
				setCountDown(prev => prev - 1)
			}, 1000)
		}
		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current)
			}
		}
	}, [isStarted])

	useEffect(() => {
		if (countDown < 0) {
			clearInterval(timerRef.current)
			onClose()
		}
	}, [countDown, onClose])

	const onSkipClick = () => {
		clearInterval(timerRef.current)
		onClose()
	}

	return (
		<Modal isOpen={isStarted}>
			<div className={cn(styles.timeout, className)}>
				<h2>Have a rest!</h2>
				<CircularProgressBar
					className={styles.timeout_bar}
					percentage={(countDown * 100) / (time / 1000)}
					circleWidth={80}
					stats={`${countDown}`}
				/>
				<Button
					onClick={onSkipClick}
					className={styles.skip_btn}
					theme={'outlined'}
				>
					Skip
				</Button>
			</div>
		</Modal>
	)
})
