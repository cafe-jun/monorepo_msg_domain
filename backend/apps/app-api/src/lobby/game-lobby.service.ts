import { User } from '@app/entity/domain/user/user.entity';
import { Injectable } from '@nestjs/common';

export const GameLobbyService = 'GameLobbyServiceToken';

export interface GameLobbyService {
  create(user: User);
  join(user: User);
  leave(user: User);
  validate(lobbyId: string);
  isLobbyHost(user: User, lobbyId: string);
  getHost(lobbyId: number);
  getLobby(lobbyId: number);
  getNumOfUsers(lobbyId: number);
  getAllGameLobby();
}
