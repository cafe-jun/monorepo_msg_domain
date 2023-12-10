export class EmitLeaveGameRequest {
  sid: string;
  userName: string;
  constructor(userName: string, sid: string) {
    this.userName = userName;
    this.sid = sid;
  }
}
