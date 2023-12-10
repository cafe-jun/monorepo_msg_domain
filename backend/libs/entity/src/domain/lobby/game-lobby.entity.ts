import { Column, Entity, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { PrimaryGeneratedPkEntity } from '../common/primary-generated-pk.entity';
import { GameUser } from './game-user.entity';

@Entity({ database: 'message', name: 'gameLobby' })
export class GameLobby extends PrimaryGeneratedPkEntity {
  @Column('int', { name: 'hostId' })
  hostId: number;
  @Column('int', { name: 'maxRound' })
  maxRound: number;
  @Column('int', { name: 'curRound' })
  curRound: number;
  @Column('varchar', { name: 'roundType' })
  roundType: string;
  @Column('int', { name: 'roundType' })
  roundLimitTime: number;
  @Column('boolean', { name: 'isPlaying' })
  isPlaying: boolean;
  @Column('timestamp with local time zone', { name: 'gameStartDate' })
  gameStartDate: Date;

  @OneToMany(() => User, (user) => user.userChatRooms, {
    cascade: ['insert', 'update', 'remove'],
  })
  gameUser: GameUser;
}
