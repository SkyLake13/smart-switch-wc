import { SmartSwitchWc } from "./components/smartSwitchWc";
import { SwitchRow } from './components/switchRow';


if(!customElements.get(SmartSwitchWc.selector)) {
    customElements.define(SmartSwitchWc.selector, SmartSwitchWc);
}

customElements.whenDefined(SmartSwitchWc.selector).then(() => {
    console.log(`${SmartSwitchWc.selector} has been defined.`);
});



if(!customElements.get(SwitchRow.selector)) {
    customElements.define(SwitchRow.selector, SwitchRow);
}

customElements.whenDefined(SwitchRow.selector).then(() => {
    console.log(`${SwitchRow.selector} has been defined.`);
});
