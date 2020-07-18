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
    }

    connectedCallback(): void {
        super.connectedCallback();
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