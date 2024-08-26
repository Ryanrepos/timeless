import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './libs/interceptor/Logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Integrating pipe as a global
  app.useGlobalPipes(new ValidationPipe());      

  // Integrating logger, interceptor
  app.useGlobalInterceptors(new LoggingInterceptor()); 

  await app.listen(process.env.PORT_API ?? 3000);
}
bootstrap();

// Main.ts => AppModule => Components/Database Modules