import { NextPageAuth } from '../app/types/auth.types'
import Home from '@/pages/home/Home'
import Layout from '@/components/layout/Layout'

const HomePage: NextPageAuth = () => {
	return (
		<Layout>
			<Home />
		</Layout>
	)
}

export default HomePage
