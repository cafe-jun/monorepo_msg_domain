import { Column, Entity, Index, OneToMany } from 'typeorm';
import { PrimaryGeneratedPkEntity } from '../common/primary-generated-pk.entity';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { UserChatRoom } from '../chat-room/user-chat-room.entity';

@Entity({ database: 'message' })
export class User extends PrimaryGeneratedPkEntity {
  @IsEmail()
  @Column()
  email: string;

  @Column('varchar', { nullable: true })
  nickname: string;

  @Column('varchar', { nullable: true })
  refreshToken: string;

  @OneToMany(() => UserChatRoom, (userChatRoom) => userChatRoom.user)
  userChatRooms!: UserChatRoom[];

  static of(email: string, nickname: string): User {
    const user = new User();
    user.email = email;
    user.nickname = nickname;
    return user;
  }

  static oauthOf(email: string, nickname: string): User {
    const user = new User();
    user.email = email;
    user.nickname = nickname;
    return user;
  }
}
