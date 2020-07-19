import { LitElement, html, TemplateResult, css, CSSResult, property } from 'lit-element';
import '@material/mwc-switch';

export class SwitchRow extends LitElement {
    public static get selector() { return 'switch-row' };

    public static get styles(): CSSResult[] {
        return [
            css`
                mwc-switch {
                    --mdc-theme-surface: orange;
                    /* --mdc-theme-on-surface: orange; */
                    --mdc-theme-secondary: black;
                }
            `];
    }

    @property({
        type: Boolean, reflect: true, attribute: true
    })
    public checked: boolean = false;

    constructor() {
        super();
    }

    connectedCallback(): void {
        super.connectedCallback();
    }

    private toggle(): void {
        this.checked = !this.checked;
        this.dispatchToggleEvent();
    }

    private dispatchToggleEvent(): void {
        this.dispatchEvent(new CustomEvent('toggle', {
            bubbles: true,
            composed: true,
            detail: {
                checked: this.checked
            }
        }));
    }

    public render(): TemplateResult {
        return html`
            <mwc-switch ?checked="${this.checked}" @change="${() => this.toggle()}"></mwc-switch>
        `;
    }
}