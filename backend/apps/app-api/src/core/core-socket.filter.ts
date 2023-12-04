import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';

@Catch(Error)
export class SocketExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof SocketExceptionFilter) {
      const ackCallback = host.getArgByIndex(2);
      ackCallback(exception);
    } else {
      console.error(exception);
    }
  }
}
