import { Module } from '@nestjs/common';
import { MemberResolver } from './member.resolver';
import { MemberService } from './member.service';
import { MongooseModule } from '@nestjs/mongoose';
import memberSchema from '../../schemas/Member.model';
import { AuthModule } from '../auth/auth.module';
import { ViewModule } from '../view/view.module';
import { LikeModule } from '../like/like.module';
import FollowSchema from '../../schemas/Follow.model';
import NotificationSchema from '../../schemas/Notification.model';
import { NotificationModule } from '../notification/notification.module';

@Module({
	imports: [MongooseModule.forFeature([
		{	
			name: "Member", 
			schema: memberSchema,
		}
	]), 
	MongooseModule.forFeature([
		{
			name: 'Follow',
			schema: FollowSchema,
		},
	]),
	// MongooseModule.forFeature([
	// 	{
	// 		name: "Notification",
	// 		schema: NotificationSchema,
	// 	},
	// ]),
	AuthModule, 
	ViewModule, 
	LikeModule,
	NotificationModule,
	],
	providers: [MemberResolver, MemberService],
	exports: [MemberService],
})
export class MemberModule {}
