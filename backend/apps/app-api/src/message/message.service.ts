import { MandatoryArgumentNullException } from '../common/exception/mandatory-argument-null.exception';
import { Inject, Injectable } from '@nestjs/common';
import {
  MessageRepository,
  MessageRepositoryToken,
} from './message.repository';
import { Message } from '@app/entity/domain/message/message.entity';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class MessageService {
  constructor(
    @Inject(MessageRepositoryToken)
    private messageRepository: MessageRepository,
  ) {}

  async findAllByChatRoomIdAndSenderId(
    chatRoomId: number,
    senderId: number,
  ): Promise<Message[]> {
    return this.messageRepository.findAllByChatRoomIdAndSenderId(
      chatRoomId,
      senderId,
    );
  }

  async save(messageDto: MessageDto): Promise<Message> {
    return this.messageRepository.save(messageDto.toEntity());
  }

  async update(messageDto: MessageDto): Promise<void> {
    if (!messageDto) {
      throw new MandatoryArgumentNullException();
    }
    return this.messageRepository.update(messageDto.id, {
      content: messageDto.content,
    });
  }

  async delete(id: number): Promise<void> {
    return this.messageRepository.delete(id);
  }

  async isOwnerThrMessage(id: number, senderId: number) {
    return this.messageRepository.isOwnwerTheMessage(id, senderId);
  }
}
