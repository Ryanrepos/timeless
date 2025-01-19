import { InputType, Field, Int } from '@nestjs/graphql';
import { NotificationType, NotificationGroup, NotificationStatus } from '../../enums/notification.enum';
import { IsNotEmpty, IsOptional, Min } from 'class-validator';
import { Direction } from '../../enums/common.enum';
import { ObjectId } from 'mongoose';

@InputType()
export class NotificationInput {
	@IsNotEmpty()
	@Field(() => NotificationType)
	notificationType: NotificationType;

	@Field(() => NotificationStatus, {nullable: true})
	notificationStatus?: NotificationStatus;

	@IsNotEmpty()
	@Field(() => NotificationGroup)
	notificationGroup: NotificationGroup;

	@IsNotEmpty()
	@Field(() => String)
	notificationTitle: string;

	@Field(() => String, { nullable: true })
	notificationDesc?: string;

	@IsNotEmpty()
	@Field(() => String)
	authorId: ObjectId;

	@IsNotEmpty()
	@Field(() => String)
	receiverId: ObjectId;

	@Field(() => String)
	propertyId?: ObjectId;

	@Field(() => String)
	articleId?: ObjectId;
}

@InputType()
class NISearch {
	@IsOptional()
	@Field(() => NotificationStatus, { nullable: true })
	notificationStatus?: NotificationStatus;
}

@InputType()
export class NotificationsInquiry {
   @IsNotEmpty()
   @Min(1)
   @Field(() => Int)
   page:number;

   @IsNotEmpty()
   @Min(1)
   @Field(() => Int)
   limit:number;

   @IsOptional()
   @Field(() => String, {nullable: true})
   sort?:string;

   @IsOptional()
   @Field(() => Direction, { nullable: true })
   direction?: Direction;

   @IsNotEmpty()
   @Field(() => NISearch)
	search: NISearch;
}
