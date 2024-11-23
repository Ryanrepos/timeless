import { registerEnumType } from '@nestjs/graphql';

export enum PropertyCategory {
	MEN = 'MEN',
    WOMEN = 'WOMEN',
    UNISEX = 'UNISEX',
}
registerEnumType(PropertyCategory, {
	name: 'PropertyCategory',
});

export enum PropertyStatus {
	ACTIVE = 'ACTIVE',
	SOLD = 'SOLD',
	DELETE = 'DELETE',
}
registerEnumType(PropertyStatus, {
	name: 'PropertyStatus',
});

export enum PropertyBrand {
	ROLEX = 'ROLEX',
	PATEK_PHILIPPE = 'PATEK_PHILIPPE',
	AUDEMARS_PIGUET = 'AUDEMARS_PIGUET',
	VACHERON_CONSTANTIN = 'VACHERON_CONSTANTIN',
	RICHARD_MILLE = 'RICHARD_MILLE',
	JAEGER_LECOULTRE = 'JAEGER_LECOULTRE',
	CARTIER = 'CARTIER',
	HUBLOT = 'HUBLOT',
	OMEGA = 'OMEGA',
	BREITLING = 'BREITLING',  
}
registerEnumType(PropertyBrand, {
	name: 'PropertyBrand',
});

export enum PropertyLocation {
	SEOUL = 'SEOUL',
	BUSAN = 'BUSAN',
	INCHEON = 'INCHEON',
	DAEGU = 'DAEGU',
	GYEONGJU = 'GYEONGJU',
	GWANGJU = 'GWANGJU',
	CHONJU = 'CHONJU',
	DAEJON = 'DAEJON',
	JEJU = 'JEJU',
}
registerEnumType(PropertyLocation, {
	name: 'PropertyLocation',
});

