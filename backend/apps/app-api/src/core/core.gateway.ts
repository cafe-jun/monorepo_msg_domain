import { UseFilters } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { SocketExceptionFilter } from './core-socket.filter';
import { Server, Socket } from 'socket.io';
import { UserService } from '../user/user.service';
import { User } from '@app/entity/domain/user/user.entity';
import { GameLobbyService } from '../lobby/game-lobby.service';

@UseFilters(new SocketExceptionFilter())
@WebSocketGateway({ namespace: 'core' })
export class CoreGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private userService: UserService,
    private gameLobbyService: GameLobbyService,
  ) {}
  async handleDisconnect(client: Socket) {
    // const user = await this.userService.getUser(client.id);
    // if (user.lobbyId) {
    //   const gameLobby = await this.gameService.getGame(user.lobbyId);
    //   if (gameLobby.getIsPlaying()) {
    //     await this.handleLeaveGame(client);
    //   } else {
    //     await this.handleLeaveLobby(client);
    //   }s
    // }
    // await this.userService.deleteUser(client.id);
  }
  async handleConnection(client: Socket) {
    await this.userService.save(User.of(client.id, 'noname'));
  }

  // @SubscribeMessage('update-user-name')
  // async handleCreateUser(
  //   @ConnectedSocket() client: Socket,
  //   @MessageBody() userName: string,
  // ) {
  //   return await this.userService.update(
  //     client.id,
  //     User.of(client.id, userName),
  //   );
  // }

  @SubscribeMessage('create-lobby')
  // TODO: return type WsResponse 로 바꿔야함. + 학습 필요.
  async handleCreateLobby(@ConnectedSocket() client: Socket) {
    // TODO: socket connection 라이프 사이클에 user 생성, 삭제 로직 할당
    const user = await this.userService.findUserById(client.id);
    const lobbyId = await this.lobbyService.createLobby(user);
    await client.join(lobbyId);
    return lobbyId;
  }

  @SubscribeMessage('webrtc-offer')
  async handleOffer(@ConnectedSocket() client: Socket, @MessageBody() body) {
    client.broadcast
      .to(body.offerReceiveID)
      .emit('webrtc-offer', body.sdp, client.id);
  }

  @SubscribeMessage('webrtc-answer')
  async handleAnswer(@ConnectedSocket() client: Socket, @MessageBody() body) {
    // const user = await this.userService.getUser(client.id);
    client.broadcast
      .to(body.answerReceiveID)
      .emit('webrtc-answer', body.sdp, client.id, 'test');
  }

  @SubscribeMessage('webrtc-ice')
  async handleIce(@ConnectedSocket() client: Socket, @MessageBody() body) {
    // const user = await this.userService.getUser(client.id);
    client.broadcast
      .to(body.candidateReceiveID)
      .emit('webrtc-ice', body.ice, client.id, 'test');
  }
}
