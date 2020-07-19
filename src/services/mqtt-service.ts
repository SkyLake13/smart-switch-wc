import { MqttClient, connect, Packet, ISubscriptionGrant, OnConnectCallback, OnMessageCallback, OnErrorCallback } from 'mqtt';

export class MqttService {
    public client: MqttClient | undefined;

    constructor(private url: string) {
        
    }

    protected connect(url?: string): void {
        if(url) {
            this.url = url;
        }
        
        this.client = connect(this.url);
    }

    public set onConnect(callback: OnConnectCallback) {
        this.client?.on('connect', callback);
    }

    public set onMessage(callback: OnMessageCallback) {
        this.client?.on('message', callback);
    }

    public set onError(callback: OnErrorCallback) {
        this.client?.on('error', callback);
    }

    public get ready(): boolean {
        if(this.client) {
            return this.client.connected;
        }
        
        return false;
    }

    protected subscribeTo(event: string | string[]): Promise<ISubscriptionGrant[]> {
        return new Promise((resolve, reject) => {
            this.client?.subscribe(event, (err: Error, granted: ISubscriptionGrant[]) => {
                if(err) {
                    reject(err);
                }
                resolve(granted);
            });
        });
    }

    protected unsubscribeTo(event: string | string[]): Promise<Packet> {
        return new Promise((resolve, reject) => {
            this.client?.unsubscribe(event, {}, (err?: Error, packet?: Packet) => {
                if(err) {
                    reject(err);
                }
                resolve(packet);
            });
        });
    }

    protected sendMessage(queueName: string, message: string): void {
        if(this.client && this.ready) {
            this.client.publish(queueName, message, {});
        }
    }
}