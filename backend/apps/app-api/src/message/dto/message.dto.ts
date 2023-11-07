import { Message } from '@app/entity/domain/message/message.entity';
import { getToDayISO8601 } from 'apps/app-api/src/common/util/date.util';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class MessageDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsNumber()
  @IsNotEmpty()
  senderId: number;

  @IsNumber()
  @IsNotEmpty()
  chatRoomId: number;

  @IsNumber()
  @IsNotEmpty()
  content: string;

  toEntity(): Message {
    const message = new Message();
    message.senderUserId = this.senderId;
    message.sendchatRoomId = this.chatRoomId;
    message.content = this.content;
    message.sendAt = getToDayISO8601();
    return message;
  }
}
