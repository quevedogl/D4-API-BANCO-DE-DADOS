import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface ServiceRequest {
  empresa: string;
  produto: string;
  marca: string;
  modelo?: string;
  estado: string;
  userId?: string;
}

@WebSocketGateway({
  cors: { origin: 'http://localhost:3000' },
})
export class ServicesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private connectedClients = 0;

  handleConnection() {
    this.connectedClients++;
  }

  handleDisconnect() {
    this.connectedClients--;
  }

  @SubscribeMessage('solicitarServico')
  handleSolicitarServico(
    @MessageBody() data: ServiceRequest,
    @ConnectedSocket() client: Socket,
  ) {
    const solicitacao = {
      ...data,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };

    // Notifica todos os clientes conectados sobre a nova solicitação
    this.server.emit('novaSolicitacao', solicitacao);

    // Confirma para quem enviou
    client.emit('solicitacaoConfirmada', {
      mensagem: 'Solicitação enviada com sucesso!',
      solicitacao,
    });

    return solicitacao;
  }

  @SubscribeMessage('entrarSala')
  handleEntrarSala(
    @MessageBody() sala: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(sala);
    client.emit('entrou', { sala });
  }
}
