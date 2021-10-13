import { fireEvent, Matcher, MatcherOptions, render } from '@testing-library/react';
import { Answer } from '../types';
import CardContainer from '../components/CardContainer';

const testProps = {
    "id": "is_heartburn_known",
    "question_text": "Is your heartburn previously known?",
    "answers": [
        {"id": "is_heartburn_known_yes", "label": "Yes", "score": 5},
        {"id": "is_heartburn_known_no", "label": "No", "score": 0}
    ] as Array<Answer>,
    "next": [
        {"answered": "is_heartburn_known_yes", "next_question": "heartburn_previous_treatment"},
        {"answered": "is_heartburn_known_no", "next_question": "heartburn_weekly_burns"}
    ],
    setHistory: jest.fn(),
    selectedAnswer: ''
    
}

describe('<Card Container /> - questions', () => {
    let getByTestId: (text: Matcher, options?: MatcherOptions | undefined, waitForElementOptions?: unknown) => HTMLElement;
    let getAllByTestId: (text: Matcher, options?: MatcherOptions | undefined, waitForElementOptions?: unknown) => HTMLElement[];
    beforeEach(() => {
        ({getByTestId, getAllByTestId} = render(<CardContainer {...testProps}/>));
    })
    it('corectly renders questions', () => {
        const container = getByTestId('component-card-container');
        expect(container).toBeTruthy();

        const question = getByTestId('ccc-question');
        expect(question.textContent).toBe(testProps.question_text);

        const buttons = getAllByTestId('ccc-answer-button');
        expect(buttons[0].textContent).toBe(testProps.answers[0].label);
        expect(buttons[1].textContent).toBe(testProps.answers[1].label);

        fireEvent.click(buttons[0]);
        expect(testProps.setHistory).toHaveBeenCalledWith( {"answer": "is_heartburn_known_yes", "id": "is_heartburn_known", "score": 5});
    })
})

const outcomeProps = {
    "id": "rest_and_come_back_later",
    "text": "Your symptom description indicates that this is a self-healing condition. We recommend that you rest for few days. Contact us again if your condition gets worse or if symptoms remain for more than three days.",
    "show_booking_button": true,
}

describe('<Card Container /> - outcome', () => {
    it('corectly renders outcome', () => {
        const { getByTestId } = render(<CardContainer {...outcomeProps}/>);
        const container = getByTestId('component-card-container');
        expect(container).toBeTruthy();

        const outcomeContent = getByTestId('ccc-outcome');
        expect(outcomeContent).toBeTruthy();

        const outcomeText = getByTestId('ccc-outcome-text');
        expect(outcomeText.textContent).toBe(outcomeProps.text);

        const bookAMeeting = getByTestId('ccc-book-button');
        expect(bookAMeeting).toBeTruthy();
        
    });

    it('corectly renders outcome without Booking button', () => {
        const { getByTestId } = render(<CardContainer {...{...outcomeProps,"show_booking_button": false} }/>);
        expect(() => {
            getByTestId('ccc-book-button');
        }).toThrow();
    })
})