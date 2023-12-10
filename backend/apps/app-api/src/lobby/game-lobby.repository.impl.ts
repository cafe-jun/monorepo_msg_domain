import { User } from '@app/entity/domain/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GameLobbyRepository } from './game-lobby.repository';
import { GameLobby } from '../../../../libs/entity/src/domain/lobby/game-lobby.entity';
import { Repository } from 'typeorm';
import { Builder } from 'builder-pattern';

export const LobbyRepositoryToken = 'LobbyRepository';

export class GameLobbyRepositoryImpl implements GameLobbyRepository {
  constructor(
    @InjectRepository(GameLobby)
    private dataSource: Repository<GameLobby>,
  ) {}
  create(user: User) {
    const gameLobby = Builder<GameLobby>().hostId(user.id).build();
  }
  updateUser(gameLobby: GameLobby, user: User) {
    const updateLobby = Builder<GameLobby>().build();
  }
  delete() {
    throw new Error('Method not implemented.');
  }
  findById() {
    throw new Error('Method not implemented.');
  }
  findAll() {
    throw new Error('Method not implemented.');
  }
  save() {
    throw new Error('Method not implemented.');
  }
  toKey() {
    throw new Error('Method not implemented.');
  }
  jsonToGameLobby() {
    throw new Error('Method not implemented.');
  }
  gameLobbyToJson() {
    throw new Error('Method not implemented.');
  }
}
