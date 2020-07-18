import { MqttClient, connect, Packet, ISubscriptionGrant } from 'mqtt';

export class SwitchService {
    public client: MqttClient | undefined;

    constructor(private url: string) {
        
    }

    public connect(url?: string): void {
        if(url) {
            this.url = url;
        }
        
        this.client = connect(this.url);
    }

    public onConnect(): Promise<Packet> {
        return this._on('connect');
    }

    public onMessage(): Promise<{topic: string, payload: Buffer, packet: Packet}> {
        return this._on('message');
    }

    public onError(): Promise<{error: Error}> {
        return this._on('error');
    }

    public get ready(): boolean {
        if(this.client) {
            return this.client.connected;
        }
        
        return false;
    }

    public on(switchName: string): void {
        this.setQueue(switchName, '1');
    }

    public off(switchName: string): void {
        this.setQueue(switchName, '0');
    }

    public subscribeTo(event: string): Promise<ISubscriptionGrant[]> {
        return new Promise((resolve, reject) => {
            this.client?.subscribe(event, (err: Error, granted: ISubscriptionGrant[]) => {
                if(err) {
                    reject(err);
                }
                resolve(granted);
            });
        });
    }

    public unsubscribeTo(event: string): Promise<Packet> {
        return new Promise((resolve, reject) => {
            this.client?.unsubscribe(event, {}, (err?: Error, packet?: Packet) => {
                if(err) {
                    reject(err);
                }
                resolve(packet);
            });
        });
    }

    private setQueue(queueName: string, payload: string): void {
        if(this.client && this.ready) {
            this.client.publish(queueName, payload, {});
        }
    }

    private _on(event: 'connect' | 'message' | 'error' | string): Promise<any> {
        return new Promise((resolve, _) => {
            this.client?.on(event, (topic: string, payload: Buffer, packet: Packet) => {
                resolve({topic, payload, packet});
            });
        });
    }
}