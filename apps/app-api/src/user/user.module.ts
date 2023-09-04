import { User } from '@app/entity/domain/user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.respository';
import { UserRepositoryImpl } from './user.respository.impl';
import { UserService } from './user.service';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserService,
    {
      provide: UserRepository,
      useFactory: (entityManager: EntityManager) =>
        new UserRepositoryImpl(new Repository(User, entityManager)),
      inject: [EntityManager],
    },
  ],
  exports: [UserService],
})
export class UserModule {}
