import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Message } from '../../libs/enums/common.enum';
import { T } from '../../libs/types/common';
import { CS, Notices } from '../../libs/dto/cs/cs';
import { CsInput, CsInquiry } from '../../libs/dto/cs/cs.input';
import { CsUpdate } from '../../libs/dto/cs/cs.update';

@Injectable()
export class CsService {
    constructor(
        @InjectModel("Notice") private readonly csModel: Model<CS>
    ){}

    public async createNotice(input: CsInput): Promise<CS> {
        try {
            const result = await this.csModel.create(input);
            return result;
        } catch(err) {
            console.log('Error, Service.model:', err.message);
			throw new BadRequestException(Message.CREATE_FAILED);
        }
    }

    public async updateNotice(memberId:ObjectId, input: CsUpdate):Promise<CS> {
        const search:T= {
            _id: input._id,
            memberId: memberId
        }
        const result = await this.csModel.findOneAndUpdate(search, input, {new:true}).exec();
        if(!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);
        return result;
    }

    public async getNoticesByAdmin(input: CsInquiry): Promise<Notices> {
        const {noticeStatus, noticeCategory, faqCategory } = input.search;
        const match:T = {};
         const sort: { [key: string]: 1 | -1 } = {
             createdAt: 1, 
         };
 
         if(noticeStatus) match.noticeStatus = noticeStatus;
         if(noticeCategory) match.noticeCategory = noticeCategory;
         if(faqCategory) match.faqCategory = faqCategory;
 
         const result = await this.csModel.aggregate([
             {$match:match},
             {$sort:sort},
             {
                 $facet:{
                     list: [{ $skip: (input.page -1)* input.limit }, { $limit: input.limit }],
                     metaCounter:[{$count: 'total'}],
                 }
             },
         ]).exec();
         if(!result) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
         return result[0];
    }

    public async removeNotice(noticeId:ObjectId):Promise<CS> {
        const search : T = {_id: noticeId};
        const result = await this.csModel.findOneAndDelete(search).exec();
        if(!result) throw new InternalServerErrorException(Message.REMOVE_FAILED);

        return result;
    }
}
