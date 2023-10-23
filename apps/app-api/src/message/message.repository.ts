import { Message } from '@app/entity/domain/message/message.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export const MessageRepositoryToken = 'MessageRepository';

export abstract class MessageRepository {
  abstract findAllByChatRoomIdAndSenderId(
    chatRoomId: number,
    senderId: number,
  ): Promise<Message[]>;
  abstract save(entity: Message): Promise<Message>;

  abstract update(
    id: number,
    partialEntity: QueryDeepPartialEntity<Message>,
  ): Promise<void>;

  abstract delete(id: number): Promise<void>;

  abstract isOwnwerTheMessage(id: number, senderId: number): Promise<boolean>;
}
