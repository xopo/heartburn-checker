import { Outcome, Question } from '../App';
import { getOutcome } from '../helpers';
import mock from '../mock';

const lastQuestionId  = 'heartburn_lost_weight'
const lastQuestion = mock.questions.find(q => q.id === lastQuestionId) as Question | Outcome;
const outcomes = mock.outcomes as Array<Outcome>;

describe('Helper functions', () => {
    describe('getOutcome', () => {
        it ('returns the correct outcome', () => {
            expect(getOutcome(4,lastQuestion, outcomes)).toStrictEqual(outcomes[0]);
            expect(getOutcome(6,lastQuestion, outcomes)).toBe(outcomes[1]);
            expect(getOutcome(49,lastQuestion, outcomes)).toBe(outcomes[1]);
            expect(getOutcome(50,lastQuestion, outcomes)).toBe(outcomes[2]);
        })
    });
})