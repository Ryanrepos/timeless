import { Field, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { NotificationGroup, NotificationStatus, NotificationType } from '../../enums/notification.enum';
import { TotalCounter } from '../member/member';

@ObjectType()
export class Notification {
  @Field(() => String)
  _id: ObjectId;

  @Field(() => NotificationType)
  notificationType: NotificationType;

  @Field(() => NotificationStatus)
  notificationStatus: NotificationStatus;

  @Field(() => NotificationGroup)
  notificationGroup: NotificationGroup;

  @Field(() => String)
  notificationTitle: string;

  @Field(() => String, { nullable: true })
  notificationDesc?: string;

  @Field(() => String)
  authorId: ObjectId;

  @Field(() => String)
  receiverId: ObjectId;

  @Field(() => String, { nullable: true })
  propertyId?: ObjectId;

  @Field(() => String, { nullable: true })
  articleId?: ObjectId;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class Notifications {
  @Field(() => [Notification])
  list: Notification[]

  @Field(() => [TotalCounter], {nullable: true})
  metaCounter: TotalCounter[];
}
