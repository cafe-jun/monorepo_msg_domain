import { Enum, EnumType } from 'ts-jenum';

@Enum('code')
export class ErrorMessage extends EnumType<ErrorMessage>() {
  static readonly ARGUMENT_INVALID = new ErrorMessage(
    '잘못된 파라미터 입니다.',
  );
  static readonly MANDATORY_ARGUMENT_IS_NULL = new ErrorMessage(
    '필수 파라미터가 없습니다.',
  );
  private constructor(readonly _message: string) {
    super();
  }

  get message(): string {
    return this._message;
  }
}

// export enum ErrorMessageEnum {
//   // ARGUMENT
//   ARGUMENT_INVALID = '잘못된 파라미터 입니다.',
//   MANDATORY_ARGUMENT_IS_NULL = '필수 파라미터가 없습니다.',

//   // USER
//   LOGIN_INPUT_INVALID_EMAIL = '일치하는 이메일이 없습니다.',
//   LOGIN_INPUT_INVALID_PASSWORD = '비밀번호가 일치하지 않습니다.',
//   USER_EMAIL_ALREADY_EXISTS = '이미 존재하는 이메일입니다.',
//   USER_NOT_FOUNDED = '해당 유저가 존재하지 않습니다.',

//   // JWT
//   UNAUTHORIZED = '허가되지 않는 접근입니다.',
//   TOKEN_EXPIRED = '토큰이 만료되었습니다.',

//   // USER-RELATIONSHIP
//   USER_RELATIONSHIP_FROM_ID_USER_ID_MISMATCH = '자신의 관계만 삭제/수정할 수 있습니다.',
//   USER_RELATIONSHIP_ID_PARAM_MISMATCH = '관계 id와 parameter가 일치하지 않습니다.',
//   USER_RELATIONSHIP_ALREADY_EXISTS = '이미 존재하는 관계입니다.',

//   // CHAT-ROOM
//   UNAUTHORIZED_INVITATION = '친구가 아닌 유저를 초대할 수 없습니다.',
//   USER_NOT_IN_CHAT_ROOM = '해당 채팅방에 참여중이지 않습니다.',
//   USER_DUPLICATE_INVITATION_EXCEPTION = '한 채팅방에 유저를 중복으로 초대할 수 없습니다.',
// }
