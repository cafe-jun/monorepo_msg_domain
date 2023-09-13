import { ErrorMessage } from './../../common/exception/error-message';
import { UnauthorizedException } from '@nestjs/common';

export class UserIncorrectEmailException extends UnauthorizedException {
  constructor() {
    super(ErrorMessage.LOGIN_INPUT_INVALID_EMAIL);
  }
}
