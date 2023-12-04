import { Column, Entity } from 'typeorm';
import { User } from '../user/user.entity';
import { PrimaryGeneratedPkEntity } from '../common/primary-generated-pk.entity';

@Entity()
export class GameLobby extends PrimaryGeneratedPkEntity {
  @Column('int', { name: 'hostId' })
  hostId: number;
  @Column('int', { name: 'maxRound' })
  maxRound: number;
  @Column('int', { name: 'curRound' })
  curRound: number;
  @Column('varchar', { name: 'roundType' })
  roundType: 'DRAW' | 'ANSWER';
  @Column('int', { name: 'roundType' })
  roundLimitTime: number;
  @Column('boolean', { name: 'isPlaying' })
  isPlaying: boolean;
  @Column('timestamp with local time zone', { name: 'gameStartDate' })
  gameStartDate: Date;
}
