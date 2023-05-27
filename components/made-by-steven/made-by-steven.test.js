import { expect, fixture, html } from '@open-wc/testing';
describe('Made by Steven', () => {
    let component;
    beforeEach(async () => {
        component = await fixture(html `<made-by-steven>Content Yo!</made-by-steven>`);
    });
    it('renders', () => expectMadeByStevenContentDidRender(component));
});
const expectMadeByStevenContentDidRender = (component) => {
    const content = (component.shadowRoot || component).querySelector('[part="base"]')?.textContent;
    console.log((component.shadowRoot));
    console.log((component.shadowRoot?.querySelector('[part="base"]')));
    console.log(content);
    expect(content).to.equal('Content Yo!');
};
