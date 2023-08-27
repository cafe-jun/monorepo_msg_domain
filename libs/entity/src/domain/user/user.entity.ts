import { Column, Entity, Index } from 'typeorm';
import { PrimaryGeneratedPkEntity } from '../common/primary-generated-pk.entity';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

@Entity({ database: 'message' })
export class User extends PrimaryGeneratedPkEntity {
  @IsEmail()
  @Column()
  email: string;

  @IsOptional()
  @Column('varchar')
  password: string;

  @Column('varchar', { nullable: true })
  nickname: string;

  @Column('varchar', { nullable: true })
  refreshToken: string;

  constructor(email: string, password: string, nickname: string) {
    super();
    this.email = email;
    this.password = password;
    this.nickname = nickname;
  }
}
