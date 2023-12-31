import { Injectable } from '@nestjs/common';
import { User } from '@app/entity/domain/user/user.entity';
import { UserRepository } from './user.respository';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(User)
    private dataSource: Repository<User>,
  ) {}
  findOneByEmail(email: string): Promise<User> {
    return this.dataSource.findOne({
      where: {
        email,
      },
    });
  }
  findOneById(id: number): Promise<User> {
    return this.dataSource.findOneBy({ id });
  }
  findByIds(ids: number[]): Promise<User[]> {
    return this.dataSource.findBy({
      id: In(ids),
    });
  }
  async save(entity: User): Promise<User> {
    await this.dataSource.insert(entity);
    return entity;
  }
  async update(id: number, entity: Partial<User>): Promise<void> {
    await this.dataSource.update(id, entity);
    return;
  }
}
