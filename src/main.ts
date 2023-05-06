import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LinkModule } from './modules/link/link.module';

async function bootstrap() {
  const app = await NestFactory.create(LinkModule);
  await app.listen(3000);
}
bootstrap();
