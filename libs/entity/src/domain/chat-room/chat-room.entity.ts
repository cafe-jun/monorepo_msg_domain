import { Column, OneToMany, Entity } from 'typeorm';
import { PrimaryGeneratedPkEntity } from '../common/primary-generated-pk.entity';
import { UserChatRoom } from './user-chat-room.entity';

@Entity()
export class ChatRoom extends PrimaryGeneratedPkEntity {
  @Column()
  name: string;

  @OneToMany(() => UserChatRoom, (userChatRoom) => userChatRoom.chatRoom, {
    cascade: ['insert'],
  })
  userChatRooms: UserChatRoom[];

  //   @OneToMany(() => Message, (message) => message.chatRoom)
  //   messages: Message[];
}
