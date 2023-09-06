import { Column, Entity, Index } from 'typeorm';
import { PrimaryGeneratedPkEntity } from '../common/primary-generated-pk.entity';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { UserRelationShipStatus } from './user-relationship.status';

@Entity()
export class UserRelationShip extends PrimaryGeneratedPkEntity {
  @Column()
  toUserId: number;

  @Column()
  fromUserId: number;

  @Column('enum', {
    enum: UserRelationShipStatus,
  })
  status: UserRelationShipStatus;

  // private constructor(email: string, password: string, nickname: string) {
  //   super();
  // }
  // static of(
  //   email: string,
  //   password: string,
  //   nickname: string,
  // ): UserRelationShip {
  //   return new UserRelationShip(email, password, nickname);
  // }
}
