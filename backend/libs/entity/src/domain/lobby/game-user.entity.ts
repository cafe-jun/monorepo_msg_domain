import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { GameLobby } from './game-lobby.entity';

@Entity({ database: 'message', name: 'gameUser' })
export class GameUser {
  @Column('int', { name: 'lobbyId' })
  lobbyId: number;
  @Column('int', { name: 'userId' })
  userId: number;
  @ManyToOne(() => GameLobby, (gameLobby) => gameLobby.gameUser, {
    cascade: ['insert', 'update', 'remove'],
  })
  gameLobby: GameLobby;
}
