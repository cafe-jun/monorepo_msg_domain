import { User } from '@app/entity/domain/user/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserRepository } from '../user.respository';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

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

  describe('[user][service] 이메일로 유저 정보 가져오기 ', () => {
    it('유저 정보 가져오기 성공', async () => {
      // Given
      const userEmail = 'a@na.com';
      const user: User = new User(userEmail, '123', 'hs');

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
});
