import { getSalt, hashCrypto } from './../../common/util/hash-crypto.util';
import { User } from '@app/entity/domain/user/user.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserSignUpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  nickname: string;

  async toEntity(): Promise<User> {
    const salt = getSalt();
    return User.of(this.email, this.nickname);
  }
}
