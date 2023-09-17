import { getSalt } from './../../common/util/hash-crypto.util';
import { User } from '@app/entity/domain/user/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserRepository } from '../user.respository';

const createUser = (salt) => {
  return User.of('test@test.com', '123', salt, 'nick');
};

describe('[user][service]', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  const salt = getSalt();
  beforeEach(async () => {
    const userRepositoryMock = {
      findOneByEmail: jest.fn(),
      findOneById: jest.fn(),
      findByIds: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: userRepositoryMock,
        },
      ],
    }).compile();
    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });
  // TODO: 이걸 해주는 이유 생각해 보기
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('이메일로 유저 정보 가져오기 ', () => {
    it('유저 정보 가져오기 성공', async () => {
      // Given

      const userEmail = 'a@na.com';
      const user: User = createUser(salt);

      const findOneBySpy = jest
        .spyOn(userRepository, 'findOneByEmail')
        .mockResolvedValue(user);

      // When
      const result = await userService.findUserByEmail(userEmail);

      // Then
      // toHaveBeenCalledWith :
      expect(findOneBySpy).toHaveBeenCalledWith(userEmail);
      expect(result).toEqual(user);
    });
  });

  describe('id로 유저 가져오기 ', () => {
    it('응답 성공', async () => {
      // Given
      const userId = 1;
      const user: User = createUser(salt);
      const findUserByIdSpy = jest.spyOn(userService, 'findUserById');
      const findOneBySpy = jest
        .spyOn(userRepository, 'findOneById')
        .mockResolvedValue(user);

      // When
      const result = await userService.findUserById(userId);

      // Then
      expect(findUserByIdSpy).toHaveBeenCalledWith(userId);
      expect(findOneBySpy).toHaveBeenCalledWith(userId);
      expect(result).toEqual(user);
    });
  });
  describe('유저 저장하기 ', () => {
    it('응답 성공', async () => {
      // Given
      const user = createUser(salt);
      const saveUser = User.of(user.email, user.password, salt, user.nickname);

      const saveServiceSpy = jest.spyOn(userService, 'save');
      const saveRepoistory = jest
        .spyOn(userRepository, 'save')
        .mockResolvedValue(saveUser);
      // When
      const result = await userService.save(user);
      console.log('result', result);
      // Then
      expect(saveServiceSpy).toHaveBeenCalledWith(user);
      expect(saveRepoistory).toHaveBeenCalledWith(user);
      expect(result).toEqual(saveUser);
    });
  });
  describe('유저 정보 업데이트 ', () => {
    it('응답 성공', async () => {
      // Given
      const user = createUser(salt);
      const partialUser: Partial<User> = {
        nickname: 'test123123',
      };

      const updateServiceSpy = jest.spyOn(userService, 'update');
      const updateRepoistory = jest.spyOn(userRepository, 'update');
      // When
      const result = await userService.update(user.id, partialUser);
      // Then
      expect(updateServiceSpy).toHaveBeenCalledWith(user.id, partialUser);
      expect(updateRepoistory).toHaveBeenCalledWith(user.id, partialUser);
      expect(result).toBeUndefined();
    });
  });
  describe('유저 ids로 유저 여러 정보를 찾기', () => {
    it('응답 성공', async () => {
      // Given
      const userIds = [1, 2];
      const users = [createUser(salt), createUser(salt)];

      const findUserByIdsSpy = jest.spyOn(userService, 'findUserByIds');
      const findBySpy = jest
        .spyOn(userRepository, 'findByIds')
        .mockResolvedValue(users);
      // When
      const result = await userService.findUserByIds(userIds);
      // Then
      expect(findUserByIdsSpy).toHaveBeenCalledWith(userIds);
      expect(findBySpy).toHaveBeenCalledWith(userIds);
      expect(result).toStrictEqual(users);
    });
  });
});
