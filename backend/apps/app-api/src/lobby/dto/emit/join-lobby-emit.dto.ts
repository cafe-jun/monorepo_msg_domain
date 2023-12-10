import { IsNotEmpty } from 'class-validator';

export class JoinLobbyRequest {
  @IsNotEmpty()
  public lobbyId: string;
}
