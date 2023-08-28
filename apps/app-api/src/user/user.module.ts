import { User } from '@app/entity/domain/user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.respository';
import { UserRepositoryImpl } from './user.respository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
})
export class UserModule {}
