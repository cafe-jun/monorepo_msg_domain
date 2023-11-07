import { UserChatRoom } from '@app/entity/domain/chat-room/user-chat-room.entity';

export const UserChatRoomRepository = 'UserChatRoomRepository';

export interface UserChatRoomRepository {
  save(entity: UserChatRoom): Promise<UserChatRoom>;
  saveAll(entities: UserChatRoom[]): Promise<UserChatRoom[]>;
  remove(entity: UserChatRoom): Promise<UserChatRoom>;
}
