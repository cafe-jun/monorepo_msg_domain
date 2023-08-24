import { Module } from '@nestjs/common';
import { AppApiController } from './app-api.controller';
import { AppApiService } from './app-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';

/**   Incoming request
 *    -> Middleware -> Guards -> Interceptors
 *    -> Pipes -> Controller -> Service
 *    -> Interceptor -> filters -> Server Response
 */

@Module({
  imports: [
    TypeOrmModule.forRoot({
      host: '',
      username: '',
      password: '',
      database: '',
      entities: [],
    }),
  ],
  controllers: [AppApiController],
  providers: [AppApiService],
})
export class AppApiModule {}
