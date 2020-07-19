import { LitElement, html, TemplateResult, css, CSSResult, property } from 'lit-element';
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

    @property({
        type: Array,
        hasChanged: () => {
            return true;
        }
    })
    public rows: { name: string, queue: string, event: string, value: boolean }[] = [
        { name: 'TV', queue: 'tv-queue', event: 'tv-event', value: false },
        { name: 'Speaker', queue: 'speaker-queue', event: 'speaker-event', value: false }
    ];

    private switchService: SwitchService;


    constructor() {
        super();

        const url = 'wss://ryzencvx:YotDoRJP_I8w@farmer.cloudmqtt.com:31772/mqtt';
        this.switchService = new SwitchService(url);
    }

    async connectedCallback(): Promise<void> {
        super.connectedCallback();

        const switchEvents = this.rows.map(r => r.event);

        this.switchService.subscribeToSwitch(switchEvents);

        this.switchService.onMessage = (topic: string, payload: Buffer, _: any) => {
            this.updateSwitchState(topic, payload);
        };
    }

    private updateSwitchState(topic: string, payload: Buffer): void {
        const row = this.rows.find(r => r.event === topic);
        if (row) {
            row.value = payload.toString() === '1' ? true : false;
            this.rows = [...this.rows];
        }
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
                    <switch-row ?checked="${row.value}" @toggle="${(event: any) => this._onToggle(row.queue, event)}">
                    </switch-row>
                </span>
            </mwc-list-item>
            <li divider role="separator"></li>
        `;
    }

    private _onToggle(queueName: string, event: CustomEvent) {
        if (this.switchService?.ready) {
            if (event.detail?.checked) {
                this.switchService.on(queueName);
            } else {
                this.switchService.off(queueName);
            }
        }
    }
}
