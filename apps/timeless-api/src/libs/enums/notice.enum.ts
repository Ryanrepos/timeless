import { registerEnumType } from '@nestjs/graphql';

export enum NoticeCategory {
	FAQ = 'FAQ',
	TERMS = 'TERMS',
	EVENT = 'EVENT',
}
registerEnumType(NoticeCategory, {
	name: 'NoticeCategory',
});

export enum NoticeStatus {
	HOLD = 'HOLD',
	ACTIVE = 'ACTIVE',
	DELETE = 'DELETE',
}
registerEnumType(NoticeStatus, {
	name: 'NoticeStatus',
});

export enum FAQCategory {
	PRODUCT = 'PRODUCT',
	PAYMENT = 'PAYMENT',
	BUYER = 'BUYER',
	COMMUNITY ='COMMUNITY',
	OTHER = 'OTHER'
}
registerEnumType(FAQCategory, {
	name: 'FAQCategory',
}); 