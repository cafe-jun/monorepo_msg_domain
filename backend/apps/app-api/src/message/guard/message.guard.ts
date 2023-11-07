import { UnAuthorizedAccessException } from '../../auth/exceptions/unauthorized-access.exception';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { MessageService } from '../message.service';

@Injectable()
export class MessageGuard implements CanActivate {
  constructor(private readonly messageService: MessageService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.sub;
    const chatRoomId = +request.param.chatRoomId;
    const messageId = +request.param.messageId;
    if (!userId || !chatRoomId || !messageId) {
      throw new UnAuthorizedAccessException();
    }
    const isOwnerTheMessage = await this.messageService.isOwnerThrMessage(
      messageId,
      userId,
    );
    if (!isOwnerTheMessage) {
      throw new UnAuthorizedAccessException();
    }
    return true;
  }
}
