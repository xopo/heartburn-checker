import {Matcher, MatcherOptions, render} from '@testing-library/react';

import CardHeader from "../components/CardHeader";

const testProps = {
    title: 'Test App',
}

describe('<CardHeader />', () => {
    let getByTestId: (text: Matcher, options?: MatcherOptions | undefined, waitForElementOptions?: unknown) => HTMLElement;
    beforeEach(() => {
        ({getByTestId} = render(<CardHeader {...testProps}/>));
    })

    it('correctly renders the component', () => {
        const header = getByTestId('component-card-header');
        expect(header).toBeTruthy();
    });

    it('renders text based on title props received from parent', () => {
        const apptitle = getByTestId('cch-title');
        expect(apptitle.textContent).toBe(testProps.title);
    })
});