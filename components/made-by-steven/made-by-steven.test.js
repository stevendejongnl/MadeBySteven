import { expect, fixture, html } from '@open-wc/testing';
import { getPart } from '../../helpers/testing.js';
import { MadeBySteven } from './made-by-steven.js';
import './made-by-steven.js';
describe('Made by Steven', () => {
    let component;
    let part;
    beforeEach(async () => {
        component = await fixture(html `<made-by-steven>Content Yo!</made-by-steven>`);
        part = getPart(component);
    });
    it('renders', () => expect(component).to.be.instanceOf(MadeBySteven));
    it('renders slotted content', () => expectMadeByStevenContentDidRender(part));
});
const expectMadeByStevenContentDidRender = (part) => {
    const [slottedContent] = part.querySelector('slot').assignedNodes();
    expect(slottedContent.textContent).to.equal('Content Yo!');
};
//# sourceMappingURL=made-by-steven.test.js.map