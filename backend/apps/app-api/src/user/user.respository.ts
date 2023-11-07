import { User } from '@app/entity/domain/user/user.entity';

export const UserRepository = 'UserRepository';

export interface UserRepository {
  findOneByEmail(email: string): Promise<User | null>;

  findOneById(id: number): Promise<User | null>;

  findByIds(ids: number[]): Promise<User[] | null>;

  save(entity: User): Promise<User>;

  update(id: number, entity: Partial<User>): Promise<void>;
}
