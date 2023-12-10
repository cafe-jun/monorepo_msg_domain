import { User } from '@app/entity/domain/user/user.entity';
import { Inject } from '@nestjs/common';
import { GameLobbyService } from './game-lobby.service';
import {
  GameLobbyRepository,
  GameLobbyRepositoryToken,
} from './game-lobby.repository';

export class GameLobbyServiceImpl implements GameLobbyService {
  constructor(
    @Inject(GameLobbyRepositoryToken)
    private gameLobbyRepository: GameLobbyRepository,
  ) {}
  async create(user: User) {
    await this.gameLobbyRepository.create(user);
  }
  async join(user: User) {
    // await this.gameLobbyRepository
  }
  leave(user: User) {
    throw new Error('Method not implemented.');
  }
  validate(lobbyId: string) {
    throw new Error('Method not implemented.');
  }

  isLobbyHost(user: User, lobbyId: string) {
    throw new Error('Method not implemented.');
  }
  getHost(lobbyId: number) {
    throw new Error('Method not implemented.');
  }
  getLobby(lobbyId: number) {
    throw new Error('Method not implemented.');
  }
  getNumOfUsers(lobbyId: number) {
    throw new Error('Method not implemented.');
  }
  getAllGameLobby() {
    throw new Error('Method not implemented.');
  }
}
