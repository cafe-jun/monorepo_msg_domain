import { Controller, Get, Res } from '@nestjs/common';
import { AppApiService } from './app-api.service';

// @Controller()
export class AppApiController {
  constructor(private readonly appApiService: AppApiService) {}

  // @Get('index')
  // getHello(@Res() res: Response) {
  //   res('index.html', {
  //     root: 'public',
  //   });
  // }
}
