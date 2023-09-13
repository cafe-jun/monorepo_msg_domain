import { Enum, EnumType } from 'ts-jenum';

// export enum UserRelationShipStatus {
//   FOLLOW = 'FOLLOW',
//   BLOCK = 'BLOCK',
// }

@Enum('status')
export class UserRelationShipStatus extends EnumType<UserRelationShipStatus>() {
  static readonly FOLLOW = new UserRelationShipStatus('FOLLOW');
  static readonly BLOCK = new UserRelationShipStatus('BLOCK');
  private constructor(readonly _status: string) {
    super();
  }

  get status(): string {
    return this._status;
  }
}
