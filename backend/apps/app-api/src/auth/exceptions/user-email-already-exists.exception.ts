import { ErrorMessage } from './../../common/exception/error-message';
import { ConflictException } from '@nestjs/common';

export class UserEmailAlreadyExistsException extends ConflictException {
  constructor() {
    super(ErrorMessage.USER_EMAIL_ALREADY_EXISTS);
  }
}
