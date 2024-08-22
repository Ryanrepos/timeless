import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';

@Resolver()
export class MemberResolver {
	constructor(private readonly memberService: MemberService) {}

	// Query = GET(RestApi)
	// Mutation = POST(RestApi)

	@Mutation(() => String)
	public async signup(): Promise<string> {
		console.log('mutation: signup');
		return this.memberService.signup();
	}

	@Mutation(() => String)
	public async login(): Promise<string> {
		console.log('mutation: login');
		return this.memberService.login();
	}

	@Mutation(() => String)
	public async updateMember(): Promise<string> {
		console.log('mutation: updateMember');
		return this.memberService.updateMember();
	}

	@Query(() => String)
	public async getMember(): Promise<string> {
		console.log('query: getMember');
		return this.memberService.getMember();
	}
}
