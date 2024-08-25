import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from '../../libs/dto/member/member';
import { MemberInput } from '../../libs/dto/member/member.input';

@Injectable()
export class MemberService {
	constructor(@InjectModel('Member') private readonly memberModel: Model<Member>) {} // Member DTO

	public async signup(input: MemberInput): Promise<Member> {
		//TODO: HASH PASSWORDS

		try {
			const result = this.memberModel.create(input);
            // TODO: AUTHENTICATION WITH TOKENS
			return result;
		} catch (err) {
			console.log('Error, Service.model:', err);
            throw new BadRequestException(err);
		}
	}

	public async login(): Promise<string> {
		return 'login executed';
	}

	public async updateMember(): Promise<string> {
		return 'updateMember executed';
	}

	public async getMember(): Promise<string> {
		return 'getMember executed';
	}
}
