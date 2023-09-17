import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { PrimaryGeneratedPkEntity } from '../common/primary-generated-pk.entity';
import { CompositeKeyAndBaseMetaTimeStampEntity } from '../common/composite-base-meta-timestamp';
import { User } from '../user/user.entity';
import { ChatRoom } from './chat-room.entity';

@Entity()
export class UserChatRoom extends CompositeKeyAndBaseMetaTimeStampEntity {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  chatRoomId: number;

  @ManyToOne(() => User, (user) => user.userChatRooms, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.userChatRooms, {
    onDelete: 'CASCADE',
  })
  chatRoom: ChatRoom;

  private constructor(userId: number, chatRoomId: number) {
    super();
    this.userId = userId;
    this.chatRoomId = chatRoomId;
  }

  static of(userId: number, chatRoomId: number): UserChatRoom {
    return new UserChatRoom(userId, chatRoomId);
  }
}
