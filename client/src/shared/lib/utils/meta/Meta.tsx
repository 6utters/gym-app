import { FC, PropsWithChildren } from 'react'
import { ISeo } from '@/shared/lib/utils/meta/meta.interface'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { filterText } from '@/shared/lib/string/filterText/filterText'
import logoSvg from '@/shared/assets/svgs/logos/app-logo.svg'
import { mergeSeoTitle } from '@/shared/lib/seo'
import { APP_NAME } from '@/shared/consts'

//TODO: fix image problem

export const Meta: FC<PropsWithChildren<ISeo>> = ({
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
				<title itemProp='headline'>{mergeSeoTitle(title)}</title>
				{description ? (
					<>
						<meta
							itemProp={'description'}
							name={'description'}
							content={filterText(description, 152)}
						/>
						<link rel='canonical' href={currentUrl} />
						<meta property={'og:locale'} content={'en'} />
						<meta property={'og:title'} content={mergeSeoTitle(title)} />
						<meta property={'og:url'} content={currentUrl} />
						<meta property={'og:image'} content={image || logoSvg} />
						<meta property={'og:site_name'} content={APP_NAME} />
						<meta
							property={'og:description'}
							content={filterText(description, 197)}
						/>
					</>
				) : (
					<meta name='robots' content='noindex, nofollow' />
				)}
			</Head>
			{children}
		</>
	)
}
