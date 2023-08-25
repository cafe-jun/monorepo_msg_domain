import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class AppApiService {
  constructor(
    @InjectPinoLogger(AppApiService.name)
    private readonly logger: PinoLogger,
  ) {}
  getHello(): string {
    this.logger.trace({ foo: 'bar' }, 'baz %s', 'qux');
    this.logger.debug('foo %s %o', 'bar', { baz: 'qux' });
    this.logger.info('foo');
    return 'Hello World!';
  }
}
