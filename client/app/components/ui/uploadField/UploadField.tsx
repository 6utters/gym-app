import { FC } from 'react'
import { IUploadField } from './uploadFile.interface'
import styles from './UploadField.module.scss'

const UploadField: FC<IUploadField> = ({ onChange, placeholder, error }) => {
	return (
		<div className={styles.file}>
			<label>
				<span>{placeholder}</span>
				<input type="file" onChange={onChange} />
				{error && <div className={styles.error}>{error.message}</div>}
			</label>
		</div>
	)
}

export default UploadField
