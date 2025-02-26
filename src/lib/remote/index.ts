import { ZStore } from '@/types/store';
import { randomString } from '@/utils/randomstring';
import LZString from 'lz-string';

export class RemoteConnection {
	private readonly config: RTCConfiguration = {
		iceServers: [{ urls: import.meta.env.VITE_WEB_RTC_URL }],
	};
	private readonly channelName: string = randomString();

	private connection: RTCPeerConnection;
	private channel: RTCDataChannel;

	public offer: string | null = null;
	public answer: string | null = null;

	constructor() {
		this.connection = new RTCPeerConnection(this.config);
		this.channel = this.connection.createDataChannel(this.channelName);

		this.channel.onopen = () => console.info('Channel opened');
		this.channel.onclose = () => console.info('Channel closed');
		this.channel.onerror = () => console.error('Channel error');
	}

	public setOnMessage(callback: (event: MessageEvent<{ message: string }>) => void) {
		this.channel.onmessage = callback;
	}

	public async createOffer(): Promise<void> {
		const offer = await this.connection.createOffer();
		await this.connection.setLocalDescription(offer);

		this.offer = LZString.compressToEncodedURIComponent(JSON.stringify(offer));
	}

	public async acceptOffer(offer: string): Promise<void> {
		await this.connection.setRemoteDescription(JSON.parse(LZString.decompressFromEncodedURIComponent(offer)));
		const answer = await this.connection.createAnswer();
		await this.connection.setLocalDescription(answer);
		console.log('answer: ', answer);

		this.answer = LZString.compressToEncodedURIComponent(JSON.stringify(answer));
	}

	public async handshake(answer: string, user: ZStore.Remote['users'][0]): Promise<void> {
		console.log(JSON.parse(LZString.decompressFromEncodedURIComponent(answer)));
		const answerDesc = new RTCSessionDescription(JSON.parse(LZString.decompressFromEncodedURIComponent(answer)));
		await this.connection.setRemoteDescription(answerDesc);

		await this.send({
			status: 'Handshake successful',
			data: user,
			type: 'handshake',
		});
	}

	public async send(msg: Record<string, unknown>): Promise<void> {
		this.channel.send(
			JSON.stringify({
				message: LZString.compress(JSON.stringify(msg)),
			}),
		);
	}
}
