import { Injectable } from '@nestjs/common';
import { BoardArticle } from '../../libs/dto/board-article/board-article';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BoardArticleService {
	constructor(@InjectModel('BoardArticle') private readonly boardArticleModel: Model<BoardArticle>) {}
}
