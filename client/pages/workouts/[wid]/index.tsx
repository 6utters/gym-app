import { NextPageWithRoles } from '@/app/providers/authProvider'
import { Meta } from '@/shared/lib/utils/meta/Meta'
import { useRouter } from 'next/router'
import { ProgramDetailsPage } from '@/pages/programDetailsPage'

const ProgramDetails: NextPageWithRoles = () => {
	const router = useRouter()
	const wid = router.query.wid as string

	return (
		<Meta title={'Your program page'} description={'Details of your program'}>
			<ProgramDetailsPage programId={+wid} />
		</Meta>
	)
}

ProgramDetails.isOnlyForUser = true

export default ProgramDetails
