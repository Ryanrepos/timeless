import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationResolver } from './notification.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import NotificationSchema from '../../schemas/Notification.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{name: "Notification", schema: NotificationSchema}]), 
  AuthModule
],
  providers: [NotificationService, NotificationResolver],
  exports: [NotificationService]
})
export class NotificationModule {}
