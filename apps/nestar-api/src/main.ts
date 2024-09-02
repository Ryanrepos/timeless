import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './libs/interceptor/Logging.interceptor';
import { graphqlUploadExpress } from 'graphql-upload';
import * as express from 'express';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Integrating pipe as a global
	app.useGlobalPipes(new ValidationPipe());

	// Integrating logger, interceptor
	app.useGlobalInterceptors(new LoggingInterceptor());

	app.enableCors({ origin: true, credentials: true });
	app.use(graphqlUploadExpress({ maxFileSiz: 150000, maxFiles: 10 }));
  app.use('/uploads', express.static('./uploads'));

	await app.listen(process.env.PORT_API ?? 3000);
}
bootstrap();

// Main.ts => AppModule => Components/Database Modules
