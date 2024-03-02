import { Module } from '@nestjs/common';
import { SocketModule } from './socket/socket.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    SocketModule,
  ],
})
export class AppModule {}
