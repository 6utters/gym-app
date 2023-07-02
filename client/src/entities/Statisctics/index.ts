export type {
	Statistics,
	DayProgress,
	StatisticsSchema
} from './model/types/Statisctics'
export { StatisticsBlock } from './ui/statisticsBlock/StatisticsBlock'
export { StatisticsDayBlock } from './ui/statisticsDayBlock/StatisticsDayBlock'
export {
	statisticsActions,
	statisticsReducer,
	userSlice
} from './model/slice/statisticsSlice'
export { getDayProgress } from './model/selectors/getDayProgress/getDayProgress'
