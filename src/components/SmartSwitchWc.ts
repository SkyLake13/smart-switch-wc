import { LitElement, html, TemplateResult, css, CSSResult } from 'lit-element';
import '@material/mwc-list/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-top-app-bar';
import "./..";
import { SwitchesMqttClient } from '../services/mqtt-client';
import { IClientOptions } from 'mqtt';

export class SmartSwitchWc extends LitElement {
    public static get selector() { return 'smart-switch-wc' };

    public static get styles(): CSSResult[] {
        return [
            css`
               .switch-list-item {
                   padding-left: 10px
               }

               mwc-top-app-bar {
                    --mdc-theme-primary: orange;
                    --mdc-theme-on-primary: black;
                }
            `];
    }

    private rows = [
        { name: 'TV', queue: 'tv-queue', event: 'tv-event'  },
        { name: 'Speaker', queue: 'speaker-queue', event: 'speaker-event'  }
    ];

    // private mqttClient: SwitchesMqttClient;

    constructor() {
        super();

        const url = 'mqtt://farmer.cloudmqtt.com';
        const options: IClientOptions = {
            username: 'ryzencvx', 
            password: 'YotDoRJP_I8w',
            port: 11772
        };

        const client = new SwitchesMqttClient(url, options).on('connect', () => {
            if(client.connected) {
                client.subscribe('tv-event', (err: any) => {
                    console.log('tv-event - ', err);
                });
            }
        });
    }

    connectedCallback(): void {
        super.connectedCallback();
    }

    disconnectedCallback(): void {

    }

    public render(): TemplateResult {
        return html`
            ${this._topbar()}
            ${this._switches()}
        `;
    }

    private _topbar(): TemplateResult {
        return html`
            <mwc-top-app-bar>
                <div slot="title">Smart Switches</div>
            </mwc-top-app-bar>
        `;
    }

    private _switches(): TemplateResult {
        return html`
            <mwc-list multi>
               ${this.rows.map(row => html`${this._switchRow(row.name)}`)}
            </mwc-list>
        `;
    }

    private _switchRow(name: string): TemplateResult {
        return html`
            <mwc-list-item graphic="avatar" hasMeta>
                <span slot="graphic" class="material-icons">tv</span>
                <span>${name}</span>
                <span slot="meta">
                    <switch-row name="${name}" @toggle="${() => this._onToggle(name)}">
                    </switch-row>
                </span>
            </mwc-list-item>
            <li divider role="separator"></li>
        `;
    }

    private _onToggle(name: string) {
        console.log(`${name} clicked`);
    }
}
