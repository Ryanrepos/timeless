import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { NotificationsInquiry } from '../../libs/dto/notification/notification.input';
import { ObjectId } from 'mongoose';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { NotificationUpdate } from '../../libs/dto/notification/notification.update';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { Notifications, Notification } from '../../libs/dto/notification/notification';

@Resolver()
export class NotificationResolver {
	constructor(private readonly notificationService: NotificationService) {}

	@UseGuards(AuthGuard)
	@Query(() => Notifications)
	public async getAllNotifications(
		@Args('input') input: NotificationsInquiry,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Notifications> {
		console.log('Query: GetNotifications');
		return await this.notificationService.getAllNotifications(memberId, input);
	}

	@UseGuards(AuthGuard)
    @Mutation(() => Notification)
    public async updateNotification(
        @Args('input') input:NotificationUpdate, 
        @AuthMember('_id') memberId:ObjectId
    ): Promise<Notification>{
        console.log("Mutation: notificationUpdate ");
        input._id = shapeIntoMongoObjectId(input._id);
        return await this.notificationService.updateNotification(memberId, input);
    }

	@UseGuards(AuthGuard)
	@Mutation(() => Notification)
	public async removeNotification(@Args('notificationId') input: string): Promise<Notification> {
		console.log('Mutation: removeNotification');
		const propertyId = shapeIntoMongoObjectId(input);
		return await this.notificationService.removeNotification(propertyId);
	}

	@UseGuards(AuthGuard)
	@Mutation(() => Boolean)
	public async markAsReadNofications(@AuthMember("_id") memberId: ObjectId): Promise<boolean> {
		console.log("Mutation MarkAsReadNotifications");
		const count = await this.notificationService.markAsReadNotifications(memberId);
		return count > 0;
	}	
}
