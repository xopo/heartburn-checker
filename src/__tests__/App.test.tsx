import { render } from '@testing-library/react';
import App from '../App';

describe('<App />', () => {
    it('renders the app component', () => {
        const { getByTestId } = render(<App />);
        const app = getByTestId('component-app');
        expect(app).toBeTruthy();
    })
});