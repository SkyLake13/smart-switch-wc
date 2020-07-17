import { SmartSwitchWc } from "./components/SmartSwitchWC";

if(!customElements.get(SmartSwitchWc.selector)) {
    customElements.define(SmartSwitchWc.selector, SmartSwitchWc);
}

customElements.whenDefined(SmartSwitchWc.selector).then(() => {
    console.log(`${SmartSwitchWc.selector} has been defined.`);
});
