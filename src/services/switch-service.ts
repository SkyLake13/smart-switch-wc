import { MqttService } from './mqtt-service';
import { ISubscriptionGrant, Packet } from 'mqtt';

export class SwitchService extends MqttService {
    constructor(url: string) {
        super(url)
        super.connect();
    }

    public on(switchName: string): void {
        super.sendMessage(switchName, '1');
    }

    public off(switchName: string): void {
        super.sendMessage(switchName, '0');
    }

    public subscribeToSwitch(events: string | string []): Promise<ISubscriptionGrant[]> {
        return super.subscribeTo(events);
    }

    public unsubscribeToSwitch(events: string | string []): Promise<Packet> {
        return super.unsubscribeTo(events);
    }
}