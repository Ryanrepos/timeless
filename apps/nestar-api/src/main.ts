import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());      // Integrating pipe as a global
  await app.listen(process.env.PORT_API ?? 3000);
}
bootstrap();

// Main.ts => AppModule => Components/Database Modules