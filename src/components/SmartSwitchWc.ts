import { LitElement, html, TemplateResult, css, CSSResult } from 'lit-element';
import '@material/mwc-list/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-top-app-bar';
import "./..";
import { SwitchService } from '../services/switch-service';


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

    public get rows(): { name: string, queue: string, event: string, onValue: string, offValue: string }[] {
        return [
            { name: 'TV', queue: 'tv-queue', event: 'tv-event', onValue: '1', offValue: '0' },
            { name: 'Speaker', queue: 'speaker-queue', event: 'speaker-event', onValue: '1', offValue: '0' }
        ];
    }

    private switchService: SwitchService | undefined;
    

    constructor() {
        super();

        const url = 'wss://ryzencvx:YotDoRJP_I8w@farmer.cloudmqtt.com:31772/mqtt';
        this.switchService = new SwitchService(url);
        this.switchService?.connect();
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.switchService?.onMessage().then((_) => {
            console.log('topic -> ', _.topic);
            console.log('payload -> ', _.payload.toString());
            console.log('package -> ', _.packet);
        });

        this.switchService?.onError().then((_) => {
            console.log('error -> ', _);
        });

        this.rows.forEach(row => {
            this.switchService?.subscribeTo(row.event).then(_ => {
               // console.log('subscription - ', _);
            });
        });
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
               ${this.rows.map(row => html`${this._switchRow(row)}`)}
            </mwc-list>
        `;
    }

    private _switchRow(row: any): TemplateResult {
        return html`
            <mwc-list-item graphic="avatar" hasMeta>
                <span slot="graphic" class="material-icons">tv</span>
                <span>${row.name}</span>
                <span slot="meta">
                    <switch-row @toggle="${() => this._onToggle(row.queue)}">
                    </switch-row>
                </span>
            </mwc-list-item>
            <li divider role="separator"></li>
        `;
    }

    private _onToggle(queueName: string) {
        if(this.switchService?.ready) {
            this.switchService.on(queueName);
            console.log(`${queueName} clicked`);
        }
    }
}
