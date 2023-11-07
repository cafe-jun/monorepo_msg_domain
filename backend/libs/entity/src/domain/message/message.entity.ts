import { ChatRoom } from '@app/entity/domain/chat-room/chat-room.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PrimaryGeneratedPkEntity } from '../common/primary-generated-pk.entity';
import { IsNotEmpty } from 'class-validator';
import { User } from '../user/user.entity';

@Entity()
export class Message extends PrimaryGeneratedPkEntity {
  @Column({ name: 'send_user_id', type: 'int', unsigned: true })
  @IsNotEmpty()
  senderUserId: number;

  @Column()
  @IsNotEmpty()
  sendchatRoomId: number;

  @Column()
  content: string;

  @Column()
  sendAt: string;

  @Column({ nullable: true })
  deleteAtd: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sent_user_id' })
  sentUser: User;

  @ManyToOne(() => ChatRoom)
  @JoinColumn({ name: 'sent_chat_room_id' })
  chatRoom: ChatRoom;

  static of(sendUserId: number, sendChatRoomId: number, content: string) {
    const message = new Message();
    message.senderUserId = sendUserId;
    message.sendchatRoomId = sendChatRoomId;
    message.content = content;
    return message;
  }
}
