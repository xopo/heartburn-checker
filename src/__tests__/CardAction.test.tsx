import { fireEvent, render } from '@testing-library/react';

import CardAction from '../components/CardAction';

const actionProps = {
    isDisabled: true,
    restart: false,
    clickHandle: jest.fn()
}

describe('<CardAction /> - question', () => {
    it('renders corectly the component', () => {
        const { getByTestId } = render(<CardAction {...actionProps} />);
        const component = getByTestId('component-card-action');
        expect(component).toBeTruthy();

        const nextButton = getByTestId('cca-next');
        expect(nextButton).toBeTruthy();

        expect(() => {
            getByTestId('cca-restart');
        }).toThrow();
        // fireEvent.click(nextButton);
        // /expect(actionProps.clickHandle).toHaveBeenCalled();
    })
})


describe('<CardAction /> - outcome', () => {
    it('renders corectly the component', () => {
        const { getByTestId } = render(<CardAction {...{...actionProps, restart: true } } />);
        const nextButton = getByTestId('cca-restart');
        expect(nextButton).toBeTruthy();
        expect(() => {
            getByTestId('cca-next');
        }).toThrow();
    })
})