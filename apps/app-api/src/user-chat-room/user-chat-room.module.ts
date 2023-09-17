import { UserChatRoom } from './../../../../libs/entity/src/domain/chat-room/user-chat-room.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserChatRoomService } from './user-chat-room.service';
import { UserChatRoomRepository } from './user-chat-room.repository';
import { EntityManager, Repository } from 'typeorm';
import { UserRepositoryImpl } from '../user/user.respository.impl';
import { UserChatRoomRepositoryImpl } from './user-chat-room.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([UserChatRoom])],
  controllers: [],
  providers: [
    UserChatRoomService,
    {
      provide: UserChatRoomRepository,
      useFactory: (entityManager: EntityManager) =>
        new UserChatRoomRepositoryImpl(
          new Repository(UserChatRoom, entityManager),
        ),
      inject: [EntityManager],
    },
  ],
})
export class UserChatRoomModule {}
