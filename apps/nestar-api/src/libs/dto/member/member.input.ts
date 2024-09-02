import { Field, InputType, Int } from '@nestjs/graphql';
import { IsIn, IsNotEmpty, IsOptional, Length, Min } from 'class-validator';
import { MemberAuthType, MemberType } from '../../enums/member.enum';
import { availabeAgentSorts } from '../../config';
import { Direction } from '../../enums/common.enum';

@InputType()
export class MemberInput {
	// memberNick
	@IsNotEmpty() // checks input data is empty or not
	@Length(3, 12) // checks member nick be at least 3 and 12 range
	@Field(() => String)
	memberNick: string;

	// memberPassword
	@IsNotEmpty()
	@Length(3, 12)
	@Field(() => String)
	memberPassword: string;

	// memberPhone
	@IsNotEmpty()
	@Field(() => String)
	memberPhone: string;

	@IsOptional()
	@Field(() => MemberType, { nullable: true })
	memberType?: MemberType;

    @IsOptional()
	@Field(() => MemberAuthType, { nullable: true })
	memberAuthType?: MemberAuthType;
}

@InputType()
export class LoginInput {
	// memberNick
	@IsNotEmpty() // checks input data is empty or not
	@Length(3, 12) // checks member nick be at least 3 and 12 range
	@Field(() => String)
	memberNick: string;

	// memberPassword
	@IsNotEmpty()
	@Length(3, 12)
	@Field(() => String)
	memberPassword: string;
}

@InputType()
export class AISearch {
	@IsNotEmpty()
	@Field(() => String, {nullable: true})
	text?: string;
}

// pagination logic

@InputType()
export class AgentsInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@IsOptional()
	@IsIn(availabeAgentSorts)
	@Field(() => String, {nullable: true})
	sort?: string;

	@IsOptional()
	@Field(() => Direction, {nullable: true})
	direction?: Direction;

	@IsNotEmpty()
	@Field(() => AISearch)
	search: AISearch;
}
