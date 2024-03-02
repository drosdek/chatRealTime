import { Body, Controller, Post } from "@nestjs/common";
import { SocketService } from "../services/socket.service";

@Controller('api')
export class SocketController {
  constructor(private readonly socketService: SocketService) {}

  @Post('login')
  async login(@Body() body: { userName: string }) {    
    const { userName } = body;
    const user = this.socketService.addUser(userName);
    if (user) {
      return { success: true };
    } else {
      return { success: false, message: 'Nome de usuário já está em uso.' };
    }
  }
}