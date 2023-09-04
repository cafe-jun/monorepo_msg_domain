import { User } from '@app/entity/domain/user/user.entity';
import { UserSignUpDto } from '../user/dto/user-signup.dto';
import { UserSignInDto } from '../user/dto/user-signin.dto';
import { MsgToken } from './jwt/msg-token';

export const AuthService = 'AuthService';

export interface AuthService {
  signin(dto: UserSignInDto): Promise<MsgToken>;
  signup(dto: UserSignUpDto): Promise<User>;
  signout(id: number): Promise<void>;
  refreshToken(
    id: number,
    email: string,
    refreshToken: string,
  ): Promise<MsgToken>;
}
