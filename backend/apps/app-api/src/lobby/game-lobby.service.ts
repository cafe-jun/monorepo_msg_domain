import { User } from '@app/entity/domain/user/user.entity';
import { Injectable } from '@nestjs/common';

export interface GameLobbyService {
  joinLobby(user: User);
  leaveLobby(user: User);
  validateLobby(lobbyId: string);
  isLobbyHost(user: User, lobbyId: string);
  getHost(lobbyId: number);
  getLobby(lobbyId: number);
  getNumOfUsers(lobbyId: number);
  getAllGameLobby();
}
