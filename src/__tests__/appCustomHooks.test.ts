import { act, renderHook } from '@testing-library/react-hooks';
import AppCustomHook from "../appCustomHook";
import mock from '../mock';
import { ApiData, Question } from '../types';

describe('app custom hook', () => {
    it('should return corect data when rendered', () => {
        const {result} = renderHook(() => AppCustomHook(mock as ApiData));
        const {actualContent, isFirstQuestion, tracker, questionChoice, nextQuestionIsAvailable} = result.current;
        expect(actualContent).toStrictEqual(mock.questions[0]);
        expect(isFirstQuestion).toBeTruthy();
        expect(tracker[0]).toStrictEqual({id: 'initial', cls: 'history'});
        expect(tracker[1]).toStrictEqual({id: '0 - future', cls: 'future'});
        expect(tracker.length).toBe(11);
        expect(questionChoice).toStrictEqual({});
        expect(nextQuestionIsAvailable).toBeFalsy();
    })
    it('should change values when the exposed functions are invoked', () => {
        const {result} = renderHook(() => AppCustomHook(mock as ApiData));
        const {actualContent} = result.current;
        const answerChoice = {id: actualContent.id, answer: (actualContent as Question).answers[0].id, score: (actualContent as Question).answers[0].score}
        act(() => {
            result.current.handleRecordChoice(answerChoice);
        })
        expect(result.current.questionChoice).toStrictEqual(answerChoice);
        expect(result.current.nextQuestionIsAvailable).toBeTruthy();
    });

    it('shoud update content when handleContentAction is called', () => {
        const {result} = renderHook(() => AppCustomHook(mock as ApiData));
        const firstContent = result.current.actualContent;
        const answerChoice = {
            id: result.current.actualContent.id, 
            answer: (result.current.actualContent as Question).answers[0].id, 
            score: (result.current.actualContent as Question).answers[0].score
        };
        act(() => {
            result.current.handleRecordChoice(answerChoice);
        })
        act(() => {
            result.current.handleContentAction();
        })
        expect(result.current.actualContent).toStrictEqual(mock.questions[1]);
        expect(result.current.tracker[1]).toStrictEqual({id: firstContent.id, cls: 'history'});
        expect(result.current.isFirstQuestion).toBeFalsy();
        
        act(() => {
            result.current.handleBack();
        });
        
        expect(result.current.actualContent).toStrictEqual(mock.questions[0]);
        expect(result.current.tracker[1]).toStrictEqual({id: "0 - future", cls: 'future'});
        expect(result.current.questionChoice).toStrictEqual({});
        expect(result.current.nextQuestionIsAvailable).toBeFalsy();
    })

    it('should add correct outcome as actualContent', () => {
        const partialMock = {
            questions: [mock.questions[mock.questions.length - 1]],
            outcomes: mock.outcomes
        }
        const {result} = renderHook(() => AppCustomHook(partialMock as ApiData));
        const answerChoice = {
            id: partialMock.questions[0].id, 
            answer: partialMock.questions[0].answers[1].id, 
            score: partialMock.questions[0].answers[1].score,
        };
        
        act(() => {
            result.current.handleRecordChoice(answerChoice);
        })
        
        act(() => {
            result.current.handleContentAction();
        })
        expect(result.current.actualContent).toStrictEqual(partialMock.outcomes[0]);
        expect(result.current.tracker.length).toBe(2);
    })
});