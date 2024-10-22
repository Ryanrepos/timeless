import { Logger } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'ws';
import * as WebSocket from 'ws';
import { AuthService } from '../components/auth/auth.service';
import { Member } from '../libs/dto/member/member';
import * as url from "url"

interface MessagePayload {  // actual content of  message 
	event: string;
	text: string;
	memberData: Member;
}

interface InfoPayload {   // number of clients
	event: string;
	totalClients: number;
	memberData: Member;
	action: string
}

@WebSocketGateway({ transports: ['websocket'], secure: false })
export class SocketGateway implements OnGatewayInit {
	private logger: Logger = new Logger('SocketEventsGateway');
	private summaryClient: number = 0;
	private clientAuthMap = new Map<WebSocket, Member>()
	private messagesList: MessagePayload[] = []

	constructor(private authservice: AuthService) {}

	@WebSocketServer()
	server: Server;

	public afterInit(server: Server) {
		this.logger.verbose(`Websocket Server Initialized & total: [${this.summaryClient}]`);
	}

	private async retrieveAuth(req: any): Promise<Member> {
		try{
		 const parseUrl = url.parse(req.url, true);
		 const {token} = parseUrl.query;
		 console.log('token', token);
		 return await this.authservice.verifyToken(token as string)
		}catch(err) {
		  return null
		}
	}

	public async handleConnection(client: WebSocket, req:any) {
		const authMember = await this.retrieveAuth(req);
		console.log('authMember', authMember);
		  this.summaryClient++;
		this.clientAuthMap.set(client, authMember)
		
		const clientNick: string = authMember?.memberNick ?? 'Guest'
		this.logger.verbose(`Connection ${clientNick} & total [${this.summaryClient}]`)
	
		const infoMsg: InfoPayload = {
		  event: 'info',
		  totalClients: this.summaryClient,
		  memberData: authMember,
		  action: 'joined'
		}
		this.emitMessage(infoMsg)
		client.send(JSON.stringify({event: 'getMessage', list: this.messagesList}))
	  }
	  public handleDisconnect(client: WebSocket){
		const authMember = this.clientAuthMap.get(client)
		this.summaryClient--;
		this.clientAuthMap.delete(client)
	
		const clientNick: string = authMember?.memberNick ?? 'Guest'
		this.logger.verbose(` Disconnection ${clientNick} & total [${this.summaryClient}]`)
	
		const infoMsg: InfoPayload = {
		  event: 'info',
		  totalClients: this.summaryClient,
		  memberData: authMember,
		  action: 'left'
		};
		this.broadcastMessage(client, infoMsg)
	  }

	@SubscribeMessage('message')
	public async handleMessage(client: any, payload: string): Promise<void> {
		const authMember = this.clientAuthMap.get(client)
		const newMessage: MessagePayload = { event: "message", text: payload, memberData: authMember};

		const clientNick: string = authMember?.memberNick ?? 'Guest';

		this.logger.verbose(`NEW MESSAGE:[${clientNick}] ${payload}`)
		this.messagesList.push(newMessage)
		if (this.messagesList.length > 5) this.messagesList.splice(0, this.messagesList.length -5);
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

/*
	MESSAGE TARGET
	1. Client (only client)
	2. Broadcast (except client)
	3. Emit (all clients)
*/