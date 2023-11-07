import { CoreErrorMessage } from './error-message/core-error-message.enum';
import { BadRequestException } from '@nestjs/common';
import { ErrorMessage } from 'apps/app-api/src/common/exception/error-message';

export class IdNotMatchException extends BadRequestException {
  constructor() {
    super(CoreErrorMessage.ID_NOT_MATCHED);
  }
}
