export class JoinLobbyReEmitRequest {
  sid: string;
  userName: string;
  video?: boolean;
  audio?: boolean;

  constructor(userName: string, sid: string) {
    this.userName = userName;
    this.sid = sid;
  }
}
