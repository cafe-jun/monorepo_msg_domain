import { NestFactory } from '@nestjs/core';
import { AppApiModule } from './app-api.module';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppApiModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  app.flushLogs();
  await app.listen(3000);
}

bootstrap();
