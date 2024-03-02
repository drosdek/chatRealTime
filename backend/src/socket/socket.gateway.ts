import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService } from './services/socket.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer() server: Socket;

  constructor(private readonly socketService: SocketService) {}

  handleConnection(socket: Socket): void {
    this.socketService.handleConnection(socket);
  }

  @SubscribeMessage('createRoom')
  handleCreateRoom(
    @MessageBody() roomName: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.socketService.createRoom(roomName, client);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() roomName: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.socketService.joinRoom(roomName, client);
  }

  @SubscribeMessage('addUser')
  addUser(@MessageBody() userName: string, @ConnectedSocket() socket: Socket) {
    const user = this.socketService.addUser(userName, socket);
    if (user) {
      socket.emit('userAdded', user);
    } else {
      socket.emit('userAddError', 'Nome de usuário já em uso');
    }
  }

  @SubscribeMessage('sendMessage')
  sendMessage(
    @MessageBody() message: string,
    @ConnectedSocket() socket: Socket,
  ) {
    this.socketService.sendMessage(message, socket);
  }

  @SubscribeMessage('getRooms')
  getRooms() {
    this.socketService.getRooms();
  }
}
