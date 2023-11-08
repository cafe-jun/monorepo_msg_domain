import { Injectable, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserSignUpDto } from '../user/dto/user-signup.dto';
import { User } from '@app/entity/domain/user/user.entity';
import { UserEmailAlreadyExistsException } from './exceptions/user-email-already-exists.exception';
import { UserSignInDto } from '../user/dto/user-signin.dto';
import { UserIncorrectEmailException } from './exceptions/user-incorrect-email.exception';
import { verifyString } from '../common/util/hash-crypto.util';
import { UserIncorrectPasswordException } from './exceptions/user-incorrect-password.exception';
import { JwtPayload } from './jwt/jwt-payload';
import { MsgToken } from './jwt/msg-token';
import { UnAuthorizedAccessException } from './exceptions/unauthorized-access.exception';
import { TokenExpiredException } from './exceptions/token-expired.exception';

@Injectable()
export class AuthServiceImpl implements AuthService {
  private logger = new Logger('AuthService');
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signin(dto: UserSignInDto): Promise<MsgToken> {
    const user = await this.userService.findUserByEmail(dto.email);
    if (!user) {
      throw new UserIncorrectEmailException();
    }
    this.logger.log(`user check :: ${JSON.stringify(user)}`);
    const verifyPassword = await verifyString(
      user.password,
      user.salt,
      dto.password,
    );

    if (!verifyPassword) {
      throw new UserIncorrectPasswordException();
    }
    const msgToken = await this.generateToken(user.id, user.email);
    await this.updateRefreshToken(user.id, msgToken.refreshToken);
    return msgToken;
  }
  async signup(dto: UserSignUpDto): Promise<Partial<User>> {
    const user = await this.userService.findUserByEmail(dto.email);
    if (user) {
      throw new UserEmailAlreadyExistsException();
    }
    this.logger.log('auth signup', await dto.toEntity());
    const saveUser = await this.userService.save(await dto.toEntity());
    console.log('user:', user);
    const { password, salt, createdAt, updatedAt, ...restUser } = saveUser;
    return restUser;
  }
  async signout(id: number): Promise<void> {
    const user = await this.userService.findUserById(id);
    if (!user) {
      throw new UnAuthorizedAccessException();
    }
    return await this.userService.update(id, { refreshToken: null });
  }
  async refreshToken(
    id: number,
    email: string,
    refreshToken: string,
  ): Promise<MsgToken> {
    const user = await this.userService.findUserById(id);
    if (!user) {
      throw new UnAuthorizedAccessException();
    }
    if (!(refreshToken === user.refreshToken)) {
      throw new TokenExpiredException();
    }
    const msgToken = await this.generateToken(id, email);
    await this.updateRefreshToken(id, msgToken.refreshToken);
    return msgToken;
  }
  async generateToken(id: number, email: string): Promise<MsgToken> {
    const payload: JwtPayload = { sub: id, email: email };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME,
      }),
      this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME,
      }),
    ]);
    return { accessToken, refreshToken };
  }

  private async updateRefreshToken(id: number, refreshToken: string) {
    return await this.userService.update(id, { refreshToken });
  }
}
