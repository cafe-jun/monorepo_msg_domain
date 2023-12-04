import { Column, Entity } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class GameUser {
  @Column('int', { name: 'lobbyId' })
  lobbyId: number;
  @Column('int', { name: 'userId' })
  userId: number;
}
