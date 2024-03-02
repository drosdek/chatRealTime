import { Module } from '@nestjs/common';
import { SocketService } from './services/socket.service';
import { SocketGateway } from './socket.gateway';
import { SocketController } from './controller/socket.controller';

@Module({
  controllers: [SocketController],
  providers: [SocketGateway, SocketService],
})
export class SocketModule {}
