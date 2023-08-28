import { User } from '@app/entity/domain/user/user.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserSignUpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  nickname: string;

  async toEntity(): Promise<User> {
    return User.of(this.email, this.password, this.nickname);
  }
}
