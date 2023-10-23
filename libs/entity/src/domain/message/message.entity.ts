import { ChatRoom } from '@app/entity/domain/chat-room/chat-room.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PrimaryGeneratedPkEntity } from '../common/primary-generated-pk.entity';
import { IsNotEmpty } from 'class-validator';
import { User } from '../user/user.entity';

@Entity()
export class Message extends PrimaryGeneratedPkEntity {
  @Column()
  @IsNotEmpty()
  senderId: number;

  @Column()
  @IsNotEmpty()
  chatRoomId: number;

  @Column()
  content: string;

  @Column()
  sendAt: string;

  @Column({ nullable: true })
  deleteAtd: Date;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @ManyToOne(() => ChatRoom)
  @JoinColumn({ name: 'chatRoomId' })
  chatRoom: ChatRoom;
}
