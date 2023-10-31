import { NestFactory } from '@nestjs/core';
import { AppApiModule } from './app-api.module';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppApiModule, { bufferLogs: true });
  app.setGlobalPrefix('/api');
  app.useLogger(app.get(Logger));
  app.flushLogs();
  await app.listen(3000);
  process.on('SIGINT', async () => {
    console.log('Received SIGINT. Shutting down gracefully...');
    await app.close();
    process.exit(0);
  });
}

bootstrap();
