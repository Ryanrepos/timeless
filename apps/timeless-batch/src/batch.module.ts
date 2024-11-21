import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BatchController } from './batch.controller';
import { MongooseModule } from '@nestjs/mongoose';
import PropertySchema from 'apps/timeless-api/src/schemas/Property.model';
import MemberSchema from 'apps/timeless-api/src/schemas/Member.model'

@Module({
	imports: [ConfigModule.forRoot(), 
		DatabaseModule, 
		ScheduleModule.forRoot(),
		MongooseModule.forFeature([{name: "Property", schema: PropertySchema}]),
		MongooseModule.forFeature([{name: "Member", schema: MemberSchema}]),
		],
	controllers: [BatchController],
	providers: [BatchService],
})
export class BatchModule {}
