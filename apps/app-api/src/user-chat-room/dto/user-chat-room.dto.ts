import { UserChatRoom } from '@app/entity/domain/chat-room/user-chat-room.entity';

export class UserChatRoomDto {
  userId: number;
  chatRoomId: number;

  constructor(userId: number, chatRoomId: number) {
    this.userId = userId;
    this.chatRoomId = chatRoomId;
  }
  toEntity(): UserChatRoom {
    return UserChatRoom.of(this.userId, this.chatRoomId);
  }
}
