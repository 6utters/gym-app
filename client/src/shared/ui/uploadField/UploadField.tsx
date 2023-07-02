import { FC, memo } from 'react'
import { IUploadField } from './uploadFile.interface'
import styles from './UploadField.module.scss'

export const UploadField: FC<IUploadField> = memo(props => {
	const { onChange, placeholder, error } = props
	return (
		<div className={styles.file}>
			<label>
				<span>{placeholder}</span>
				<input type='file' onChange={onChange} />
				{error && <div className={styles.error}>{error.message}</div>}
			</label>
		</div>
	)
})
