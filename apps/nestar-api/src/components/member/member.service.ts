import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from '../../libs/dto/member/member';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { MemberStatus } from '../../libs/enums/member.enum';
import { internalExecuteOperation } from '@apollo/server/dist/esm/ApolloServer';
import { Message } from '../../libs/enums/common.enum';

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

	public async login(input: LoginInput): Promise<Member> {
        const {memberNick, memberPassword} = input;
        const response: Member = await this.memberModel.findOne({memberNick: memberNick})
            .select("+memberPassword")
            .exec();

        if(!response || response.memberStatus === MemberStatus.DELETE) {
            throw new InternalServerErrorException(Message.NO_MEMBER_NICK);
        } else if (response.memberStatus === MemberStatus.BLOCK) {
            throw new InternalServerErrorException(Message.BLOCKED_USER);
        }

        // COMPARE PASSWORD
        const isMatch = memberPassword === response.memberPassword;
        if(!isMatch) throw new InternalServerErrorException(Message.WRONG_PASSWORD);

        return response;

	}

	public async updateMember(): Promise<string> {
		return 'updateMember executed';
	}

	public async getMember(): Promise<string> {
		return 'getMember executed';
	}
}
