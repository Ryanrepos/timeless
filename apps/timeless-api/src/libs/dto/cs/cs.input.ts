import { Field, InputType, Int } from "@nestjs/graphql";
import { FAQCategory, NoticeCategory, NoticeStatus } from "../../enums/notice.enum";
import { ObjectId } from "mongoose";
import { IsNotEmpty, IsOptional, Min } from "class-validator";
import { Direction } from "../../enums/common.enum";


@InputType()
export class CsInput {

    @IsNotEmpty()
    @Field(() => NoticeCategory)
    noticeCategory: NoticeCategory;

    @IsOptional()
    @Field(() => FAQCategory, {nullable: true})
    faqCategory?: FAQCategory;

    @IsNotEmpty()
    @Field(() => String)
    noticeTitle:String;

    @IsOptional()
    @Field(() => String, {nullable: true})
    noticeContent?:String;

    @IsOptional()
    @Field(() => String, {nullable: true})
    noticeEventDate?:String;

    memberId: ObjectId;
}


@InputType()
class CsSearch {
    @IsOptional()
    @Field(() => NoticeStatus, {nullable: true})
    noticeStatus?: NoticeStatus;

    @IsOptional()
    @Field(() => NoticeCategory, {nullable: true})
    noticeCategory?: NoticeCategory;

    @IsOptional()
    @Field(() => FAQCategory, {nullable: true})
    faqCategory?: FAQCategory;
}

@InputType()
export class CsInquiry {
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

   @IsNotEmpty()
   @Field(()=> CsSearch)
   search: CsSearch;
}