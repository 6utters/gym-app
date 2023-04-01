import { FC, PropsWithChildren } from 'react'
import { ISeo } from '@/utils/meta/meta.interface'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { appName, titleMerge } from '../../config/seo.config'
import { filterText } from '@/utils/string/filterText'
import logoSvg from '@/assets/svgs/app-logo.svg'

//TODO: fix image problem

const Meta: FC<PropsWithChildren<ISeo>> = ({
	children,
	title,
	description,
	image
}) => {
	const { asPath } = useRouter()
	const currentUrl = `${process.env.APP_URL}${asPath}`
	return (
		<>
			<Head>
				<title itemProp="headline">{titleMerge(title)}</title>
				{description ? (
					<>
						<meta
							itemProp={'description'}
							name={'description'}
							content={filterText(description, 152)}
						/>
						<link rel="canonical" href={currentUrl} />
						<meta property={'og:locale'} content={'en'} />
						<meta property={'og:title'} content={titleMerge(title)} />
						<meta property={'og:url'} content={currentUrl} />
						<meta property={'og:image'} content={image || logoSvg} />
						<meta property={'og:site_name'} content={appName} />
						<meta
							property={'og:description'}
							content={filterText(description, 197)}
						/>
					</>
				) : (
					<meta name="robots" content="noindex, nofollow" />
				)}
			</Head>
			{children}
		</>
	)
}

export default Meta
