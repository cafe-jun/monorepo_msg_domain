import { NestFactory } from '@nestjs/core';
import { AppApiModule } from './app-api.module';
import { Logger } from 'nestjs-pino';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppApiModule);
  app.setGlobalPrefix('/api');
  console.log(join(__dirname, '..', 'client'));
  app.setBaseViewsDir(join(__dirname, '..', '.next', 'server', 'pages'));

  app.setViewEngine('html');
  app.useLogger(app.get(Logger));
  app.flushLogs();
  await app.listen(3001);
  process.on('SIGINT', async () => {
    console.log('Received SIGINT. Shutting down gracefully...');
    await app.close();
    process.exit(0);
  });
}

bootstrap();
