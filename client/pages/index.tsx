import { NextPageWithRoles } from '@/app/providers/authProvider'
import Home from '@/pages/home/Home'

const HomePage: NextPageWithRoles = () => {
	return <Home />
}

HomePage.isNotForUser = true

export default HomePage
