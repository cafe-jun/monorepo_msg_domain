import { User } from '@app/entity/domain/user/user.entity';
import { UserRepository } from './user.respository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private userRepository: UserRepository,
  ) {}
  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneByEmail(email);
  }

  async findUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOneById(id);
  }

  async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async update(id: number, data: Partial<User>): Promise<void> {
    console.log('update', data);
    return await this.userRepository.update(id, data);
  }

  async findUserByIds(ids: number[]): Promise<User[]> {
    return await this.userRepository.findByIds(ids);
  }
}
