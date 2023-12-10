import { GameLobby } from '@app/entity/domain/lobby/game-lobby.entity';
import { User } from '@app/entity/domain/user/user.entity';

export const GameLobbyRepositoryToken = 'LobbyRepository';

export interface GameLobbyRepository {
  create(user: User);
  updateUser(gameLobby: GameLobby, user: User);
  delete(gameLobby: GameLobby);
  findById(lobbyId: string);
  findAll();
  save(gameLobby: GameLobby);
  toKey(gameLobbyId: string);
  jsonToGameLobby(json: string);
  gameLobbyToJson(gameLobby: GameLobby);
}
