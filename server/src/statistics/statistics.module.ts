import { Module } from '@nestjs/common'
import { StatisticsService } from './statistics.service'
import { StatisticsController } from './statistics.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Statistics } from './entities/statistic.entity'
import { AuthModule } from '../auth/auth.module'

@Module({
	imports: [TypeOrmModule.forFeature([Statistics]), AuthModule],
	controllers: [StatisticsController],
	providers: [StatisticsService],
})
export class StatisticsModule {}
