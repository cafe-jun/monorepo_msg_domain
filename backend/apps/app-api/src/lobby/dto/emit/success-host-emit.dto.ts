export class SucceedHostEmitRequest {
  userName: string;
  sid: string;
  constructor(userName: string, sid: string) {
    this.userName = userName;
    this.sid = sid;
  }
}
