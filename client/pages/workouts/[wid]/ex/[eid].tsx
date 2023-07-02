import { NextPageWithRoles } from '@/app/providers/authProvider'
import { Meta } from '@/shared/lib/utils/meta/Meta'
import { useRouter } from 'next/router'
import { ProgramExercisePage } from '@/pages/programExercisePage'

const ProgramDetails: NextPageWithRoles = () => {
	const router = useRouter()
	const eid = router.query.eid as string
	const wid = router.query.wid as string

	return (
		<Meta title={'Exercise page'} description={'You current progress'}>
			<ProgramExercisePage exerciseId={+eid} programId={+wid} />
		</Meta>
	)
}

ProgramDetails.isOnlyForUser = true

export default ProgramDetails
