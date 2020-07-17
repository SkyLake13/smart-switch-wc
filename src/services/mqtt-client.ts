import { connect, MqttClient, IClientOptions, ClientSubscribeCallback, IClientPublishOptions } from 'mqtt';

export class SwitchesMqttClient {
    private client: MqttClient;

    public get connected(): boolean {
        return this.client.connected;
    }

    public get disconnected(): boolean {
        return this.client.disconnected;
    }

    constructor(private readonly url: string, private readonly options?: IClientOptions) {
        this.client = connect(this.url, this.options);
    }

    public subscribe(event: string, callBack: ClientSubscribeCallback): SwitchesMqttClient {
        this.client.subscribe(event, callBack);
        return this;
    }

    public unsubscribe(event: string): SwitchesMqttClient {
        this.client.unsubscribe(event);
        return this;
    }

    public publish(queue: string, message: any, options: IClientPublishOptions): SwitchesMqttClient {
        this.client.publish(queue, message, options);
        return this;
    }

    public on(event: 'connect' | 'message' | 'error' | string, callBack: ClientSubscribeCallback): SwitchesMqttClient {
        this.client.on(event, callBack);
        return this;
    }

    public reconnect(): SwitchesMqttClient {
        this.client.reconnect();
        return this;
    }

    public disconnect(): SwitchesMqttClient {
        this.client.end();
        return this;
    }
}