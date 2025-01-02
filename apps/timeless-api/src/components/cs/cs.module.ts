import { Module } from '@nestjs/common';
import { CsResolver } from './cs.resolver';
import { CsService } from './cs.service';
import { MongooseModule } from '@nestjs/mongoose';
import memberSchema from '../../schemas/Member.model';
import NoticeSchema from '../../schemas/Notice.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([
		{	
			name: "Member", 
			schema: memberSchema,
		}
	]),
  MongooseModule.forFeature([
    {
      name: "Notice",
      schema: NoticeSchema
    }
  ]),
  AuthModule
], 
  providers: [CsResolver, CsService]
})
export class CsModule {}
