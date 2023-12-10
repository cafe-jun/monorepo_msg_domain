import { IsNotEmpty } from 'class-validator';

export type JoinLobbyOnResponse = Array<{
  userName: string;
  sid: string;
  video: boolean;
  audio: boolean;
  isHost: boolean;
}>;
