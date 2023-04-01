import Home from '@/pages/home/Home'
import { NextPageAuth } from '../app/types/auth.types'

const HomePage: NextPageAuth = () => {
	return <Home />
}

HomePage.isNotForUser = true

export default HomePage
