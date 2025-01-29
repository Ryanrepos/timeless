import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CsService } from './cs.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { CS, Notices } from '../../libs/dto/cs/cs';
import { CsInput, CsInquiry } from '../../libs/dto/cs/cs.input';
import { CsUpdate } from '../../libs/dto/cs/cs.update';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { WithoutGuard } from '../auth/guards/without.guard';

@Resolver()
export class CsResolver {
    constructor(private readonly csService: CsService){}

    @Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
    @Mutation(() => CS)
    public async createNotice(@Args('input') input: CsInput,
    @AuthMember('_id') memberId: ObjectId,
    ): Promise<CS> {
        console.log("mutation: Create notice");
        input.memberId = memberId;
        return await this.csService.createNotice(input);
    }

    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(() => CS)
    public async updateNotice(
        @Args('input') input: CsUpdate,
        @AuthMember('_id')  memberId: ObjectId
    ):Promise<CS>{
        console.log('Mutation: noticeUpdate');
        input._id = shapeIntoMongoObjectId(input._id);
        return await this.csService.updateNotice(memberId, input);
    }

    // @Roles(MemberType.ADMIN)
    @UseGuards(WithoutGuard)
    @Query(() => Notices)
    public async getNoticesByAdmin(@Args("input") input: CsInquiry,
    @AuthMember('_id') memberId: ObjectId): Promise<Notices> {
        console.log("Query: getNoticesByAdmin");
        return await this.csService.getNoticesByAdmin(input);
    }

    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation((returns) => CS)
    public async removeNotice(@Args('noticeId') input:string):Promise<CS>{
        console.log("Mutation: removeNotice");
        const noticeId = shapeIntoMongoObjectId(input);
        return await this.csService.removeNotice(noticeId);
    }
}
