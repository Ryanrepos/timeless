import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional } from "class-validator";
import { ObjectId } from "mongoose";
import { NoticeCategory, NoticeStatus } from "../../enums/notice.enum";


@InputType()
export class CsUpdate {

    @IsNotEmpty()
    @Field(() => String)
    _id:ObjectId;

    @IsOptional()
    @Field(() => NoticeCategory, {nullable: true})
    noticeCategory?: NoticeCategory;

    @IsOptional()
    @Field(() => NoticeStatus, {nullable: true})
    noticeStatus?:NoticeStatus;

    @IsOptional()
    @Field(() => String, {nullable: true})
    noticeTitle?:String;

    @IsOptional()
    @Field(() => String, {nullable: true})
    noticeContent?:String;

    @IsOptional()
    @Field(() => String, {nullable: true})
    noticeEventDate?:String;

    @IsOptional()
    @Field(() => String, {nullable: true})
    memberId?: ObjectId;
}