import { UserChatRoom } from '@app/entity/domain/chat-room/user-chat-room.entity';
import { UserChatRoomDto } from './dto/user-chat-room.dto';
import { UserChatRoomRepository } from './user-chat-room.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserChatRoomService {
  constructor(
    @Inject(UserChatRoomRepository)
    private userChatRepository: UserChatRoomRepository,
  ) {}

  async save(dto: UserChatRoomDto): Promise<UserChatRoom> {
    return await this.userChatRepository.save(dto.toEntity());
  }

  async saveAll(dtos: UserChatRoomDto[]): Promise<UserChatRoom[]> {
    const entities: UserChatRoom[] = dtos.map((dto) => dto.toEntity());
    return await this.userChatRepository.saveAll(entities);
  }

  async remove(entity: UserChatRoom) {
    return await this.userChatRepository.remove(entity);
  }
}
