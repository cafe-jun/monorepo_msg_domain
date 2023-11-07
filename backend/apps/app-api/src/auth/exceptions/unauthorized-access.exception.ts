import { UnauthorizedException } from '@nestjs/common';
import { ErrorMessage } from '../../common/exception/error-message';

export class UnAuthorizedAccessException extends UnauthorizedException {
  constructor() {
    super(ErrorMessage.UNAUTHORIZED);
  }
}
