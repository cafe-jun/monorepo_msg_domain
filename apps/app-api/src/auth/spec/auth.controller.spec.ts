import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { UserSignUpDto } from '../../user/dto/user-signup.dto';
import { User } from '@app/entity/domain/user/user.entity';
import { getSalt } from '../../common/util/hash-crypto.util';
import { AuthServiceImpl } from '../auth.service.impl';
import { JwtPayload } from '../jwt/jwt-payload';
import { MsgToken } from '../jwt/msg-token';

describe('[auth][controller]', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const authServiceMock = {
      signup: jest.fn(),
      signin: jest.fn(),
      refreshToken: jest.fn(),
      signout: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthServiceImpl,
          useValue: authServiceMock,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthServiceImpl>(AuthServiceImpl);
  });
  afterEach(() => {
    // 모킹 초기화
    jest.clearAllMocks();
  });
  describe('회원가입', () => {
    const salt = getSalt();
    it('회원가입 성공', async () => {
      const signUpDto = new UserSignUpDto();
      signUpDto.email = 'test@gmail.com';
      signUpDto.password = '123124';
      signUpDto.nickname = 'test';

      const user: User = User.of(
        signUpDto.email,
        signUpDto.password,
        salt,
        signUpDto.nickname,
      );

      const signupControllerSpy = jest.spyOn(authController, 'signup');
      const signupServiceSpy = jest
        .spyOn(authService, 'signup')
        .mockResolvedValue(user);

      const result = await authController.signup(signUpDto);

      // Then
      expect(signupControllerSpy).toHaveBeenCalledWith(signUpDto);
      expect(signupServiceSpy).toHaveBeenCalledWith(signUpDto);
      expect(result).toStrictEqual(user);
    });
  });
  describe('로그아웃', () => {
    it('성공', async () => {
      // Given
      const sub = 1;
      const signoutControllerSpy = jest.spyOn(authController, 'signout');
      const signoutServiceSpy = jest.spyOn(authService, 'signout');

      // When
      const result = await authController.signout(sub);

      // Then
      expect(signoutControllerSpy).toHaveBeenCalledWith(sub);
      expect(signoutServiceSpy).toHaveBeenCalledWith(sub);
      expect(result).toBe(undefined);
    });
  });

  describe('토큰_갱신', () => {
    it('성공', async () => {
      // Given
      const tokenPayload: JwtPayload & { refreshToken: string } = {
        sub: 1,
        email: 'test@example.com',
        refreshToken: 'refresh_token',
      };
      const msgToken: MsgToken = {
        accessToken: 'new_access_token',
        refreshToken: 'new_refresh_tokeb',
      };
      const refreshTokenControllerSpy = jest.spyOn(
        authController,
        'refreshToken',
      );
      const refreshTokenServiceSpy = jest
        .spyOn(authService, 'refreshToken')
        .mockResolvedValue(msgToken);

      // When
      const result = await authController.refreshToken(tokenPayload);

      // Then
      expect(refreshTokenControllerSpy).toHaveBeenCalledWith(tokenPayload);
      expect(refreshTokenServiceSpy).toHaveBeenCalledWith(
        tokenPayload.sub,
        tokenPayload.email,
        tokenPayload.refreshToken,
      );
      expect(result).toStrictEqual(msgToken);
    });
  });
});
