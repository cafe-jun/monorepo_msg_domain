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

  @Column('varchar')
  salt: string;

  @Column('varchar', { nullable: true })
  nickname: string;

  @Column('varchar', { nullable: true })
  refreshToken: string;

  private constructor(
    email: string,
    password: string,
    salt: string,
    nickname: string,
  ) {
    super();
    this.email = email;
    this.password = password;
    this.salt = salt;
    this.nickname = nickname;
  }
  static of(
    email: string,
    password: string,
    salt: string,
    nickname: string,
  ): User {
    return new User(email, password, salt, nickname);
  }
}
