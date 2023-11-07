import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class AppApiService {
  constructor(
    @InjectPinoLogger(AppApiService.name)
    private readonly logger: PinoLogger,
  ) {}
  getHello(): string {
    this.logger.info('foo lansdflnsdf');
    return 'Hello World!';
  }
}
