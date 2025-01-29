import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { NotificationInput, NotificationsInquiry } from '../../libs/dto/notification/notification.input';
import { T } from '../../libs/types/common';
import { NotificationStatus } from '../../libs/enums/notification.enum';
import { Direction, Message } from '../../libs/enums/common.enum';
import { NotificationUpdate } from '../../libs/dto/notification/notification.update';
import { NotificationDTO, Notifications } from '../../libs/dto/notification/notification';

@Injectable()
export class NotificationService {
	constructor(@InjectModel('Notification') private readonly notificationModel: Model<NotificationDTO>) {}

	public async createNotif(input: NotificationInput): Promise<NotificationDTO> {
		const notification: NotificationInput = {
			notificationType: input.notificationType,
			notificationTitle: input.notificationTitle,
			notificationGroup: input.notificationGroup,
			authorId: input.authorId,
			receiverId: input.receiverId,
			propertyId: input.propertyId,
			articleId: input.articleId,
		};

		try {
			const result = await this.notificationModel.create(notification);
			return result;
		} catch (err) {
			console.log('Error: notificationService', err.message);
			throw new BadRequestException(Message.CREATE_FAILED);
		}
	}

	public async updateNotification(memberId: ObjectId, input: NotificationUpdate): Promise<NotificationDTO> {
		const { _id } = input;
		const result = await this.notificationModel
			.findOneAndUpdate(
				{
					_id: _id,
					receiverId: memberId,
				},
				input,
				{ new: true },
			)
			.exec();
		if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);
		return result;
	}

	public async deleteNotif(input): Promise<any> {
		const search: any = {
			authorId: input.authorId,
			receiverId: input.receiverId,
			productId: input.productId,
			articleId: input.articleId,
		};
		await this.notificationModel.findOneAndDelete(search).exec();
	}

	public async getAllNotifications(memberId: ObjectId, input: NotificationsInquiry): Promise<Notifications> {
		const match: T = {
			receiverId: memberId,
			notificationStatus: input?.search?.notificationStatus
				? input.search.notificationStatus
				: { $in: [NotificationStatus.WAIT, NotificationStatus.READ] },
		};

		const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };

		const result = await this.notificationModel
			.aggregate([
				{ $match: match },
				{ $sort: sort },
				{
					$facet: {
						list: [{ $skip: (input.page - 1) * input.limit }, { $limit: input.limit }],
						metaCounter: [{ $count: 'total' }],
					},
				},
			])
			.exec();
		if (!result.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
		return result[0];
	}

	public async removeNotification(notificationId: ObjectId): Promise<NotificationDTO> {
		const search: T = { _id: notificationId };
		const result = await this.notificationModel.findOneAndDelete(search).exec();
		if (!result) throw new InternalServerErrorException(Message.REMOVE_FAILED);
		return result;
	}

	public async markAsReadNotifications(memberId: ObjectId): Promise<number> {
		try {
			const result = await this.notificationModel.updateMany(
				{
					receiverId: memberId,
					notificationStatus: { $ne: 'READ' },
				},
				{ $set: { notificationStatus: 'READ' } },
			);
			return result.modifiedCount;
		} catch (error) {
			console.error('Notications status error', error);
			throw new InternalServerErrorException('Notificaton status change failed');
		}
	}
}
