import { User } from '@app/entity/domain/user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.respository';
import { UserRepositoryImpl } from './user.respository.impl';
import { UserService } from './user.service';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { userController } from './user.controller';

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
  controllers: [userController],
  exports: [UserService],
})
export class UserModule {}
