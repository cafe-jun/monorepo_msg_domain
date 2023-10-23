import { UserGuard } from '../user/guard/user.guard';
import { JwtGuard } from '../auth/guard/jwt.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageDto } from './dto/message.dto';
import { plainToInstance } from 'class-transformer';
import { ArgumentInvalidException } from '../common/exception/argument-invalid.exception';
import { MessageGuard } from './guard/message.guard';

@UseGuards(JwtGuard, UserGuard)
@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async findAll(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('chatRoomId', ParseIntPipe) chatRoomId: number,
  ): Promise<MessageDto[]> {
    const message = await this.messageService.findAllByChatRoomIdAndSenderId(
      chatRoomId,
      userId,
    );
    return message.map((m) => plainToInstance(MessageDto, m));
  }

  @Post()
  async save(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('chatRoomId', ParseIntPipe) chatRoomId: number,
    @Body() dto: MessageDto,
  ): Promise<MessageDto> {
    if (dto.id || dto.senderId !== userId || dto.chatRoomId !== chatRoomId) {
      throw new ArgumentInvalidException();
    }
    const message = await this.messageService.save(dto);
    return plainToInstance(MessageDto, message);
  }

  @UseGuards(MessageGuard)
  @Put(':messageId')
  async update(
    @Param('messageId', ParseIntPipe) messageId: number,
    @Body() dto: MessageDto,
  ): Promise<void> {
    if (messageId !== dto.id) {
      throw new ArgumentInvalidException();
    }
    return this.messageService.update(dto);
  }

  @UseGuards(MessageGuard)
  @Delete(':messageId')
  async delete(
    @Param('messageId', ParseIntPipe) messageId: number,
  ): Promise<void> {
    return this.messageService.delete(messageId);
  }
}
