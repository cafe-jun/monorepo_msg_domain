import { UnAuthorizedAccessException } from './../exceptions/unauthorized-access.exception';
import * as crypto from './../../common/util/hash-crypto.util';
import { JwtPayload } from './../jwt/jwt-payload';
import { MsgToken } from './../jwt/msg-token';
import { UserSignInDto } from './../../user/dto/user-signin.dto';
import { UserSignUpDto } from './../../user/dto/user-signup.dto';
import { AuthService } from './../auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthServiceImpl } from '../auth.service.impl';
import { User } from '@app/entity/domain/user/user.entity';

import { UserEmailAlreadyExistsException } from '../exceptions/user-email-already-exists.exception';
import { UserIncorrectEmailException } from '../exceptions/user-incorrect-email.exception';
import { UserIncorrectPasswordException } from '../exceptions/user-incorrect-password.exception';
import { TokenExpiredException } from '../exceptions/token-expired.exception';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const userServiceMock = {
      save: jest.fn(),
      findUserByEmail: jest.fn(),
      update: jest.fn(),
      findUserById: jest.fn(),
    };
    const jwtServiceMock = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceImpl,
        },
        {
          provide: UserService,
          useValue: userServiceMock,
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('회원가입', () => {
    let dto: UserSignUpDto;
    let entity: User;

    beforeEach(() => {
      dto = new UserSignUpDto();
      dto.email = 'test@test.com';
      dto.password = 'cafejun123';
      dto.nickname = 'test1231';
      const salt = crypto.getSalt();
      entity = User.of(dto.email, dto.password, salt, dto.nickname);
    });

    it('[auth][service] 회원가입 성공', async () => {
      const signupSpy = jest.spyOn(authService, 'signup');
      const findUserEmailSpy = jest
        .spyOn(userService, 'findUserByEmail')
        .mockResolvedValue(null);
      const toUserSpy = jest.spyOn(dto, 'toEntity').mockResolvedValue(entity);
      const saveSpy = jest.spyOn(userService, 'save').mockResolvedValue(entity);

      //When
      const result = await authService.signup(dto);

      //Then
      expect(signupSpy).toHaveBeenCalledWith(dto);
      expect(findUserEmailSpy).toHaveBeenCalledWith(dto.email);
      expect(toUserSpy).toHaveBeenCalled();
      expect(saveSpy).toHaveBeenCalledWith(entity);
      expect(result).toBe(entity);
    });
    it('[auth][service] 회원가입 이메일 중복으로 실패', async () => {
      // Given
      const signupSpy = jest.spyOn(authService, 'signup');
      const findUserEmailSpy = jest
        .spyOn(userService, 'findUserByEmail')
        .mockResolvedValue(entity);
      // When
      const result = authService.signup(dto);

      //Then
      await expect(result).rejects.toThrow(UserEmailAlreadyExistsException);
      expect(signupSpy).toHaveBeenCalledWith(dto);
      expect(findUserEmailSpy).toHaveBeenCalledWith(dto.email);
    });
  });
  describe('로그인', () => {
    let dto: UserSignInDto;
    let entity: User;
    let salt: string;
    beforeEach(async () => {
      dto = new UserSignInDto();
      dto.email = 'test@example.com';
      dto.password = 'password';
      salt = crypto.getSalt();
      entity = User.of(dto.email, dto.password, salt, 'nickname');
    });
    it('[auth][service] 로그인 성공', async () => {
      const accessToken = 'access_token';
      const refreshToken = 'refresh_token';
      const msgToken: MsgToken = {
        accessToken,
        refreshToken,
      };
      const payload: JwtPayload = { sub: entity.id, email: entity.email };
      const signinSpy = jest.spyOn(authService, 'signin');
      const findUserByEmailSpy = jest
        .spyOn(userService, 'findUserByEmail')
        .mockResolvedValue(entity);
      const verifySpy = jest
        .spyOn(crypto, 'verifyString')
        .mockResolvedValue(true);

      const jwtSignSpy = jest
        .spyOn(jwtService, 'sign')
        .mockImplementationOnce(() => accessToken)
        .mockImplementationOnce(() => refreshToken);
      const updateSpy = jest.spyOn(userService, 'update');
      // when
      const result = await authService.signin(dto);

      expect(signinSpy).toHaveBeenCalledWith(dto);
      expect(findUserByEmailSpy).toHaveBeenCalledWith(dto.email);
      expect(verifySpy).toHaveBeenCalledWith(
        dto.password,
        salt,
        entity.password,
      );
      expect(jwtSignSpy).toHaveBeenCalledTimes(2);
      expect(jwtSignSpy).toHaveBeenCalledWith(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME,
      });
      expect(jwtSignSpy).toHaveBeenCalledWith(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME,
      });
      expect(updateSpy).toHaveBeenCalledWith(entity.id, { refreshToken });
      expect(result).toStrictEqual(msgToken);
    });

    it('[auth][service] 로그인 실패 - 이메일 불일치', async () => {
      // Given
      const signinSpy = jest.spyOn(authService, 'signin');
      const findUserByEmailSpy = jest.spyOn(userService, 'findUserByEmail');

      // When
      const result = authService.signin(dto);

      // Then
      await expect(result).rejects.toThrow(UserIncorrectEmailException);
      expect(signinSpy).toHaveBeenCalledWith(dto);
      expect(findUserByEmailSpy).toHaveBeenCalledWith(dto.email);
    });
    it('[auth][service] 로그인 실패 - 패스워드 불일치', async () => {
      // Given
      const signinSpy = jest.spyOn(authService, 'signin');
      const findUserByEmailSpy = jest
        .spyOn(userService, 'findUserByEmail')
        .mockResolvedValue(entity);
      const verifySpy = jest
        .spyOn(crypto, 'verifyString')
        .mockResolvedValue(false);
      // When
      const result = authService.signin(dto);

      // Then
      await expect(result).rejects.toThrow(UserIncorrectPasswordException);
      expect(signinSpy).toHaveBeenCalledWith(dto);
      expect(findUserByEmailSpy).toHaveBeenCalledWith(dto.email);
      expect(verifySpy).toHaveBeenCalledWith(
        dto.password,
        salt,
        entity.password,
      );
    });
  });
  describe('로그아웃', () => {
    let userId: number;
    let user: User;
    const salt = crypto.getSalt();
    beforeEach(() => {
      userId = 10;
      user = User.of('ema@a.com', 'pass', salt, 'nick');
    });
    it('[auth][service] 로그아웃 성공', async () => {
      const signoutSpy = jest.spyOn(authService, 'signout');
      const findByIdSpy = jest
        .spyOn(userService, 'findUserById')
        .mockResolvedValue(user);
      const updateSpy = jest.spyOn(userService, 'update').mockResolvedValue();

      // When
      const result = await authService.signout(userId);
      //Then
      expect(signoutSpy).toHaveBeenCalledWith(userId);
      expect(findByIdSpy).toHaveBeenCalledWith(userId);
      expect(updateSpy).toHaveBeenCalledWith(userId, { refreshToken: null });
      expect(result).toBeUndefined();
    });
    it('[auth][service] 로그아웃 실패 - userId와 일치하는 유저 없음', () => {
      const signoutSpy = jest.spyOn(authService, 'signout');
      const findByIdSpy = jest
        .spyOn(userService, 'findUserById')
        .mockResolvedValue(null);
      // When
      const result = authService.signout(userId);
      //Then
      expect(signoutSpy).toHaveBeenCalledWith(userId);
      expect(findByIdSpy).toHaveBeenCalledWith(userId);
      expect(result).rejects.toThrow(UnAuthorizedAccessException);
    });
  });

  describe('토큰 재발급', () => {
    let user: User;
    const salt = crypto.getSalt();
    beforeEach(async () => {
      user = User.of('ema@a.com', 'pass', salt, 'nick');
      user.refreshToken = 'test_refresh_token';
    });
    it('[auth][service] 토큰 재발급 성공', async () => {
      // Given
      const accessToken = 'test_access_token_1';
      const refreshToken = 'test_access_token_1';
      const msgToken: MsgToken = {
        accessToken,
        refreshToken,
      };
      const payload: JwtPayload = { sub: user.id, email: user.email };
      const refreshTokenSpy = jest.spyOn(authService, 'refreshToken');
      const findByIdSpy = jest
        .spyOn(userService, 'findUserById')
        .mockResolvedValue(user);
      const jwtSignSpy = jest
        .spyOn(jwtService, 'sign')
        .mockImplementationOnce(() => accessToken)
        .mockImplementationOnce(() => refreshToken);

      const updateSpy = jest.spyOn(userService, 'update');

      const result = await authService.refreshToken(
        user.id,
        user.email,
        user.refreshToken,
      );
      expect(refreshTokenSpy).toBeCalledWith(
        user.id,
        user.email,
        user.refreshToken,
      );
      expect(findByIdSpy).toHaveBeenCalledWith(user.id);
      expect(jwtSignSpy).toHaveBeenCalledTimes(2);
      expect(jwtSignSpy).toHaveBeenCalledWith(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME,
      });
      expect(jwtSignSpy).toHaveBeenCalledWith(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME,
      });
      expect(updateSpy).toBeCalledWith(user.id, { refreshToken });
      expect(result).toStrictEqual(msgToken);
    });

    it('[auth][service] 실패 - 일치하는 id와 user가 존재하지 않음', async () => {
      // Given
      const refreshTokenSpy = jest.spyOn(authService, 'refreshToken');
      const findByIdSpy = jest
        .spyOn(userService, 'findUserById')
        .mockResolvedValue(null);
      // When
      const result = authService.refreshToken(
        user.id,
        user.email,
        user.refreshToken,
      );
      // Then
      await expect(result).rejects.toThrow(UnAuthorizedAccessException);
      expect(refreshTokenSpy).toBeCalledWith(
        user.id,
        user.email,
        user.refreshToken,
      );
      expect(findByIdSpy).toBeCalledWith(user.id);
    });
    it('[auth][service] 실패 - refresh 토큰값이 다름 ', async () => {
      // Given
      const refreshTokenSpy = jest.spyOn(authService, 'refreshToken');
      const findByIdSpy = jest
        .spyOn(userService, 'findUserById')
        .mockResolvedValue(user);
      const other_refreshToken = 'diffent user refresh token';
      // When
      const result = authService.refreshToken(
        user.id,
        user.email,
        other_refreshToken,
      );
      // Then
      await expect(result).rejects.toThrow(TokenExpiredException);
      expect(refreshTokenSpy).toBeCalledWith(
        user.id,
        user.email,
        other_refreshToken,
      );
      expect(findByIdSpy).toBeCalledWith(user.id);
    });
  });
});
