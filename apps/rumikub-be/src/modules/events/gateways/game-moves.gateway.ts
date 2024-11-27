import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class GameMovesGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('test-message')
  handleMessage(client: Socket, payload: any): string {
    return 'Hello world!';
  }
}
