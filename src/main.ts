import dotenv from 'dotenv';
import getenv from 'getenv';
if (getenv('ENV') === 'dev') dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureSwagger } from './swagger.configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configureSwagger(app);
  await app.listen(3000);
}
bootstrap();
