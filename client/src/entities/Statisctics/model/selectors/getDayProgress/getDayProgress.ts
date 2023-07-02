import { StateSchema } from '@/app/providers/storeProvider'

const todayDate = new Date().toLocaleDateString()

export const getDayProgress = (state: StateSchema) =>
	state.statistics.dayProgress[todayDate] || []
