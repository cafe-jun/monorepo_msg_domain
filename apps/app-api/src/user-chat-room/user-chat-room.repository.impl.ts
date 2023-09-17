import { Injectable } from '@nestjs/common';
import { UserChatRoomRepository } from './user-chat-room.repository';
import { UserChatRoom } from '@app/entity/domain/chat-room/user-chat-room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserChatRoomRepositoryImpl implements UserChatRoomRepository {
  constructor(
    @InjectRepository(UserChatRoom)
    private dataSource: Repository<UserChatRoom>,
  ) {}
  save(entity: UserChatRoom): Promise<UserChatRoom> {
    return this.dataSource.save(entity);
  }
  saveAll(entities: UserChatRoom[]): Promise<UserChatRoom[]> {
    return this.dataSource.save(entities);
  }
  remove(entity: UserChatRoom): Promise<UserChatRoom> {
    return this.dataSource.remove(entity);
  }
}
