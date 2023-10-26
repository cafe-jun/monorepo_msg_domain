import { Enum, EnumType } from 'ts-jenum';

@Enum('message')
export class CoreErrorMessage extends EnumType<CoreErrorMessage>() {
  static readonly ID_NOT_MATCHED = new CoreErrorMessage(
    'id 값이 일치하지 않습니다.',
  );

  private constructor(readonly _message: string) {
    super();
  }

  get message(): string {
    return this._message;
  }
}
