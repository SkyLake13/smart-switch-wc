import { LitElement, html, TemplateResult, property, query, css, CSSResult } from 'lit-element';
import '@material/mwc-list/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-top-app-bar';
import "./..";

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
        type: String, reflect: true
    })
    public text: string = 'Smart Switch component';


    @query('div')
    private div?: HTMLElement;

    private rows = [
        { name: 'TV', queue: 'tv-queue', event: 'tv-event'  },
        { name: 'Speaker', queue: 'speaker-queue', event: 'speaker-event'  }
    ];

    constructor() {
        super();

        console.log('---------constructor--------');
        console.log(this.div);
        console.log('---------constructor--------');
    }

    connectedCallback(): void {
        super.connectedCallback();
        console.log('---------connectedCallback--------');
        console.log(this.div);
        console.log('---------connectedCallback--------');
    }

    shouldUpdate(args: any): boolean {
        console.log('---------shouldUpdate--------');
        console.log(this.div);
        console.log(args);
        console.log('---------shouldUpdate--------');
        return true;
    }

    async firstUpdated(args: any): Promise<void> {
        console.log('---------firstUpdated--------');
        console.log(this.div);
        console.log(args);
        console.log('---------firstUpdated--------');
    }

    updated(changedProps: any): void {
        super.updated(changedProps);
        console.log('---------updated--------');
        console.log(changedProps);
        console.log(this.div);
        console.log('---------updated--------');
    }
    

    disconnectedCallback(): void {
        console.log('---------disconnectedCallback--------');
        console.log(this.div);
        console.log('---------disconnectedCallback--------');
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
