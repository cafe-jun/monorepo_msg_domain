import { Message } from '@app/entity/domain/message/message.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageController } from './message.controller';
import {
  MessageRepository,
  MessageRepositoryToken,
} from './message.repository';
import { MessageRepositoryImpl } from './message.repository.impl';
import { Repository, EntityManager } from 'typeorm';
import { MessageService } from './message.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [MessageController],
  providers: [
    MessageService,
    {
      provide: MessageRepository,
      useClass: MessageRepositoryImpl,
    },
  ],
})
export class MessageModule {}
