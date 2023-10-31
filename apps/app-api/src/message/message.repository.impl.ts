import { Message } from '@app/entity/domain/message/message.entity';
import { MessageRepository } from './message.repository';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class MessageRepositoryImpl implements MessageRepository {
  constructor(
    @InjectRepository(Message)
    private repoistory: Repository<Message>,
  ) {}
  findAllByChatRoomIdAndSenderId(
    sendchatRoomId: number,
    senderUserId: number,
  ): Promise<Message[]> {
    return this.repoistory.findBy({ sendchatRoomId, senderUserId });
  }

  save(entity: Message): Promise<Message> {
    return this.repoistory.save(entity);
  }

  async update(
    id: number,
    partialEntity: QueryDeepPartialEntity<Message>,
  ): Promise<void> {
    await this.repoistory.update(id, partialEntity);
  }

  async delete(id: number): Promise<void> {
    await this.repoistory.delete(id);
  }

  isOwnwerTheMessage(id: number, senderId: number): Promise<boolean> {
    return this.repoistory
      .createQueryBuilder('m')
      .where('m.id = :id', { id })
      .andWhere('m.senderId = :senderId', { senderId })
      .getExists();
  }
}
