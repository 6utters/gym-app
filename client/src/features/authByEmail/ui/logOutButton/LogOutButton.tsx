import { FC, useCallback } from 'react'

import { logOut } from '../../model/services/logOut/logOut'
import { useAppDispatch } from '@/shared/lib/hooks'
import { IoLogOutOutline } from 'react-icons/io5'

import styles from './LogOutButton.module.scss'

export const LogOutButton: FC = () => {
	const dispatch = useAppDispatch()
	const onLogOutClickHandler = useCallback(() => {
		dispatch(logOut())
	}, [dispatch])

	return (
		<button className={styles.log_out_btn} onClick={onLogOutClickHandler}>
			<IoLogOutOutline />
		</button>
	)
}
