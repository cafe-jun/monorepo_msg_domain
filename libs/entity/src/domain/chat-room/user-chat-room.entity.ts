import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { PrimaryGeneratedPkEntity } from '../common/primary-generated-pk.entity';
import { CompositeKeyAndBaseMetaTimeStampEntity } from '../common/composite-base-meta-timestamp';
import { User } from '../user/user.entity';
import { ChatRoom } from './chat-room.entity';

@Entity()
export class UserChatRoom extends PrimaryGeneratedPkEntity {
  @Column({ name: 'user_id', type: 'int', unsigned: true })
  userId: number;

  @Column({ name: 'chat_room_id', type: 'int', unsigned: true })
  chatRoomId: number;

  @ManyToOne(() => User, (user) => user.userChatRooms, {
    cascade: ['insert', 'update', 'remove'],
  })
  user: User;

  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.userChatRooms, {
    cascade: ['insert', 'update', 'remove'],
  })
  chatRoom: ChatRoom;

  static of(userId: number, chatRoomId: number): UserChatRoom {
    const entity = new UserChatRoom();
    entity.chatRoomId = chatRoomId;
    entity.userId = userId;
    return entity;
  }
}
