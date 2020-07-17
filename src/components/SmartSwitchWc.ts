import { LitElement, html, TemplateResult, property, query, css, CSSResult } from 'lit-element';

export class SmartSwitchWc extends LitElement {
    public static get selector() { return 'smart-switch-wc' };

    public static get styles(): CSSResult[] {
        return [
            css`
            :host {
                display: block;
            }`
        ];
    }


    @property({
        type: String, reflect: true
    })
    public text: string = 'Smart Switch component';


    @query('div')
    private div?: HTMLElement;

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
        this._updateLocalStorage('disconnected', 1)
        console.log('---------disconnectedCallback--------');
        console.log(this.div);
        console.log('---------disconnectedCallback--------');
    }

    _updateLocalStorage(key: string, value: number): void {
        if (localStorage.getItem(key)) {
            let val = Number(localStorage.getItem(key));
            if (val) {
                val = val + value;
                localStorage.setItem(key, val.toString());
            }
        } else {
            localStorage.setItem(key, value.toString());
        }
    }

    public render(): TemplateResult {
        return html`
            <div>
               ${this.text}
            </div>
        `;
    }
}