import { LitElement, html, TemplateResult, property, css, CSSResult } from 'lit-element';
import '@material/mwc-switch';

export class SwitchRow extends LitElement {
    public static get selector() { return 'switch-row' };

    public static get styles(): CSSResult[] {
        return [
            css`

            `];
    }


    @property({
        type: String, reflect: true
    })
    public name: string = '';

    constructor() {
        super();

        console.log('---------constructor--------');
    }

    connectedCallback(): void {
        super.connectedCallback();
        console.log('---------connectedCallback--------');
    }

    shouldUpdate(args: any): boolean {
        console.log('---------shouldUpdate--------');
        console.log(args);
        return true;
    }

    async firstUpdated(args: any): Promise<void> {
        console.log(args);
        console.log('---------firstUpdated--------');
    }

    updated(changedProps: any): void {
        super.updated(changedProps);
        console.log('---------updated--------');
        console.log(changedProps);
    }


    disconnectedCallback(): void {
        console.log('---------disconnectedCallback--------');
    }

    private dispatchToggleEvent(): void {
        this.dispatchEvent(new CustomEvent('toggle', {
            bubbles: true,
            composed: true,
            detail: {
                name: this.name
            }
        }));
    }

    public render(): TemplateResult {
        return html`
                <mwc-switch @change="${() => this.dispatchToggleEvent()}"></mwc-switch>
        `;
    }
}