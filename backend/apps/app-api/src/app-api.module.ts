import { Module, ValidationPipe } from '@nestjs/common';
import { AppApiController } from './app-api.controller';
import { AppApiService } from './app-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import pino from 'pino';
import { User } from '@app/entity/domain/user/user.entity';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ArgumentInvalidException } from './common/exception/argument-invalid.exception';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { GlobalExceptionFilter } from './common/filter/global-exception.filter';
import { MySqlConfigModule } from './config/mysql/mysql-config.module';
import { MySQLConfigService } from './config/mysql/mysql-config.service';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserChatRoom } from '@app/entity/domain/chat-room/user-chat-room.entity';
import { ChatRoom } from '@app/entity/domain/chat-room/chat-room.entity';
import { UserChatRoomModule } from './user-chat-room/user-chat-room.module';
import { MessageModule } from './message/message.module';
import { Message } from '@app/entity/domain/message/message.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
/**   Incoming request
 *    -> Middleware -> Guards -> Interceptors
 *    -> Pipes -> Controller -> Service
 *    -> Interceptor -> filters -> Server Response
 */

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'web'),
    //   exclude: ['/api*'],
    // }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MySqlConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [MySqlConfigModule],
      inject: [MySQLConfigService],
      useFactory: (mysqlConfigService: MySQLConfigService) => {
        console.log(mysqlConfigService.host);
        return {
          type: 'mysql',
          host: mysqlConfigService.host,
          username: mysqlConfigService.username,
          password: mysqlConfigService.password,
          database: mysqlConfigService.database,
          entities: [User, UserChatRoom, ChatRoom, Message],
          synchronize: false,
          logging: true,
          autoLoadEntities: true, // 이건 왜 사용하는거지 ?
        };
      },

      dataSourceFactory: async (option) => {
        const dataSource = await new DataSource(option).initialize();
        return dataSource;
      },
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: (req, res) => ({
          context: 'HTTP',
        }),
        stream: pino.destination({
          dest: `./logger-${new Date().getDay()}.log`,
          sync: false, // Asynchronous logging
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    UserModule,
    UserChatRoomModule,
    MessageModule,
    AuthModule,
  ],
  // controllers: [AppApiController],
  providers: [
    AppApiService,
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          transformOptions: {
            enableImplicitConversion: true,
          },
          whitelist: true,
          forbidNonWhitelisted: true,
          transform: true,
          exceptionFactory: (_error) => new ArgumentInvalidException(),
        }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppApiModule {}
