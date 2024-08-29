import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';

/*
Query = GET(RestApi)
Mutation = POST(RestApi)
*/

@Resolver()
export class MemberResolver {
	constructor(private readonly memberService: MemberService) {}

	@Mutation(() => Member) // Member DTO
	public async signup(@Args('input') input: MemberInput): Promise<Member> {
		console.log('mutation: signup');
		return this.memberService.signup(input);
	}

	@Mutation(() => Member)
	public async login(@Args('input') input: LoginInput): Promise<Member> {
		console.log('mutation: login');
		return this.memberService.login(input);
	}

	// Authenticated users (USER, ADMIN, AGENT)
	@UseGuards(AuthGuard) // AuthGuard ni chaqirib ishlatish
	@Mutation(() => String)
	public async updateMember(@AuthMember('_id') memberId: ObjectId): Promise<string> {
		console.log('mutation: updateMember');
		return this.memberService.updateMember();
	}

	@UseGuards(AuthGuard) // AuthGuard ni chaqirib ishlatish
	@Query(() => String)
	public async checkAuth(@AuthMember('memberNick') memberNick: string): Promise<string> {
		console.log('mutation: checkAuth');
		console.log("memberNick:", memberNick);
		return `Hi ${memberNick}`;
	}

	@Query(() => String)
	public async getMember(): Promise<string> {
		console.log('query: getMember');
		return this.memberService.getMember();
	}

	/** ADMIN **/

	// Authorization: ADMIN
	@Mutation(() => String)
	public async getAllMembersByAdmin(): Promise<string> {
		console.log('mutation: getAllMembersByAdmin');
		return this.memberService.getAllMembersByAdmin();
	}

	// Authorization: ADMIN
	@Mutation(() => String)
	public async updateMemberByAdmin(): Promise<string> {
		console.log('mutation: updateMemberByAdmin');
		return this.memberService.updateMemberByAdmin();
	}
}
