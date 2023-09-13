import { Column, Entity, Index } from 'typeorm';
import { PrimaryGeneratedPkEntity } from '../common/primary-generated-pk.entity';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { UserRelationShipStatus } from './user-relationship.status';

@Entity({ database: 'message' })
export class UserRelationShip extends PrimaryGeneratedPkEntity {
  @Column()
  toUserId: number;

  @Column()
  fromUserId: number;

  @Column('varchar', {
    
  })
  _status: UserRelationShipStatus;


  get status() {
    UserRelationShipStatus[this._st]
  }
  private constructor(toUserId: string, fromUserId: string, status: string) {
    super();
  }
  static of(
    toUserId: string,
    fromUserId: string,
    status: string,
  ): UserRelationShip {
    return new UserRelationShip(toUserId, fromUserId, status);
  }
}
