import { Logger } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'ws';
import * as WebSocket from 'ws';

interface MessagePayload {  // actual content of  message 
	event: string;
	text: string;
}

interface InfoPayload {   // number of clients
	event: string;
	totalClients: number;
}

@WebSocketGateway({ transports: ['websocket'], secure: false })
export class SocketGateway implements OnGatewayInit {
	private logger: Logger = new Logger('SocketEventsGateway');
	private summaryClient: number = 0;

	@WebSocketServer()
	server: Server;

	public afterInit(server: Server) {
		this.logger.verbose(`Websocket Server Initialized & total: [${this.summaryClient}]`);
	}

	handleConnection(client: WebSocket, ...args: any[]) {
		this.summaryClient++;
		this.logger.verbose(`=== Connection & total: [${this.summaryClient}]`);

		const infoMsg: InfoPayload = {
			event: 'info',
			totalClients: this.summaryClient,
		};

		this.emitMessage(infoMsg);
	}

	handleDisconnect(client: WebSocket, ...args: any[]) {
		this.summaryClient--;
		this.logger.verbose(`=== Disconnection & total: [${this.summaryClient}]`);

		const infoMsg: InfoPayload = {
			event: 'info',
			totalClients: this.summaryClient,
		};
		// client -- disconnect
		this.broadcastMessage(client, infoMsg);
	}

	@SubscribeMessage('message')
	public async handleMessage(client: any, payload: string): Promise<void> {
		const newMessage: MessagePayload = { event: "message", text: payload};

		this.logger.verbose(`NEW MESSAGE: ${payload}`);
		this.emitMessage(newMessage);
	}

	// Sends messages to all clients except one who sent message
	private broadcastMessage(sender: WebSocket, message: InfoPayload | MessagePayload) {
		this.server.clients.forEach((client) => {
			if (client !== sender && client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify(message));
			}
		});
	}

	// Responsible for sending messages to all clients
	private emitMessage(message: InfoPayload | MessagePayload) {
		this.server.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify(message));
			}
		});
	}
}
