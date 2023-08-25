import { Module } from '@nestjs/common';
import { AppApiController } from './app-api.controller';
import { AppApiService } from './app-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

/**   Incoming request
 *    -> Middleware -> Guards -> Interceptors
 *    -> Pipes -> Controller -> Service
 *    -> Interceptor -> filters -> Server Response
 */

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
      entities: [],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: (req, res) => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
  ],
  controllers: [AppApiController],
  providers: [AppApiService],
})
export class AppApiModule {}
