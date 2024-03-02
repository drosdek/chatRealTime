import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  username: string;
}

@Injectable()
export class SocketService {
  private readonly connectedClients: Map<string, Socket> = new Map();
  private readonly messages: any[] = [];

  private rooms = new Map<string, Set<string>>();
  private users: Map<string, User> = new Map();

  handleConnection(socket: Socket): void {
    const clientId = socket.id;
    this.connectedClients.set(clientId, socket);

    socket.on('disconnect', () => {
      this.connectedClients.delete(clientId);
    });
  }

  sendMessage(message: string, socket: Socket): void {
    this.messages.push(message);
    socket.broadcast.emit('receivedMessage', message);
    this.emitEvent('previousMessages', this.messages);
  }

  createRoom(roomName: string, client: Socket): void {
    if (!this.rooms.has(roomName)) {
      this.rooms.set(roomName, new Set<string>());
      client.join(roomName);
      this.rooms.get(roomName).add(client.id);
      client
        .to(roomName)
        .emit('updateUsersList', Array.from(this.rooms.get(roomName)));
      client.emit('roomCreated', roomName);
    } else {
      client.emit('roomExists', roomName);
    }
  }

  joinRoom(roomName: string, client: Socket): void {
    client.join(roomName);
    if (!this.rooms.has(roomName)) {
      this.rooms.set(roomName, new Set<string>());
    }
    this.rooms.get(roomName).add(client.id);
    client
      .to(roomName)
      .emit('updateUsersList', Array.from(this.rooms.get(roomName)));
  }

  addUser(username: string, socket?: Socket): User | null {
    if (this.users.has(username)) {
      return null;
    }
    const id = uuidv4();
    const user: User = { id, username };

    this.users.set(username, user);

    socket.data.userId = id;

    return user;
  }

  removeUser(username: string): void {
    this.users.delete(username);
  }

  getUserByUsername(username: string): User | null {
    return this.users.get(username) || null;
  }

  getUserBySocket(socket: Socket): User | null {
    const userId = socket.data.userId;
    return userId ? this.getUserById(userId) : null;
  }

  getRooms(): string[] {
    return Array.from(this.rooms.keys());
  }

  private getUserById(userId: string): User | null {
    for (const user of this.users.values()) {
      if (user.id === userId) {
        return user;
      }
    }
    return null;
  }

  emitEvent(event: string, data: any): void {
    this.connectedClients.forEach((socket) => {
      socket.emit(event, data);
    });
  }
}
