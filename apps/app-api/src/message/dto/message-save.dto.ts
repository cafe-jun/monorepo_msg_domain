import { PrimaryGeneratedPkEntity } from '@app/entity/domain/common/primary-generated-pk.entity';
import { Message } from '@app/entity/domain/message/message.entity';
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class MessageSaveDto {
  @Expose({ name: 'sendUserId' })
  @IsNumber()
  private readonly _sendUserId: number;

  @Expose({ name: 'sentChatRoomId' })
  @IsNumber()
  private readonly _sendChatRoomId: number;

  @Expose({ name: 'content' })
  @IsString()
  private readonly _content: number;

  constructor(sendUserId: number, sendChatRoomId: number, content: number) {
    this._sendUserId = sendUserId;
    this._sendChatRoomId = sendChatRoomId;
    this._content = content;
  }
  get sendUserId(): number {
    return this._sendUserId;
  }

  get sendChatRoomId(): number {
    return this._sendChatRoomId;
  }

  get content(): number {
    return this._content;
  }
  // toEntity(): Message {
  //   return Message;
  // }
}
