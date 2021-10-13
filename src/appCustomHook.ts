import { useState, useEffect, useCallback } from 'react';
import mock from './mock';
import { getOutcome } from './helpers';
import type { HistoryEntry, Outcome, Question, TrackerEntry } from './types';


export default function AppCustomHook() {
    const [questions, setQuestions] = useState([] as Array<Question>);
    const [actualContent, setActualContent] = useState({} as Question | Outcome);
    const [initialQuestionId, setInitialQuestionId] = useState('');
    const [actualContentId, setActualContentId] = useState('');
    const [questionChoice, setquestionChoice] = useState({} as HistoryEntry);
    const [qHistory, setQHistory] = useState([] as Array<HistoryEntry>);
    const [tracker, setTracker] = useState([] as Array<TrackerEntry>);

    const initialQueston = mock.questions[0];

    function getTrackerId(id:number): string {
        return `${id} - future`;
    }
    const memoisedCreateTracker = useCallback(() => {
        function createTracker(historyList: Array<HistoryEntry>): Array<TrackerEntry> {
        const trackerList = [{id: 'initial', cls: 'history'}] as Array<TrackerEntry>;
        for (let i = 0; i <= mock.questions.length - 1; i ++ ) {
            if (historyList[i]) {
            trackerList.push({id: historyList[i].id, cls: 'history'});
            } else {
            trackerList.push({id: getTrackerId(i), cls: 'future'});
            }
        }
        return trackerList;
        }
        return createTracker(qHistory);
    }, [qHistory]);

    

    const initialSetup = useCallback(() => {
        
        setQHistory([]);
        setInitialQuestionId(initialQueston.id);
        setActualContentId(initialQueston.id);
        setTracker(memoisedCreateTracker());
    }, []);

    useEffect(() => {
        setQuestions(mock.questions as Array<Question>);
        initialSetup();
    }, [initialSetup]);

    useEffect(() => {
        const questionId = actualContentId || initialQuestionId;
        const questionSet = questions.find(question => question.id === questionId);
        questionSet && setActualContent(questionSet);
    }, [actualContentId, initialQuestionId, questions]);

    useEffect(() => {
        setTracker(memoisedCreateTracker());
    }, [qHistory, memoisedCreateTracker]);

    function handleRecordChoice(newEntry: HistoryEntry) {
        setquestionChoice(newEntry);
    }

    function handleContentAction() {
        if ('show_booking_button' in actualContent) {  // should reset
        initialSetup();
        return;
        }
        const lastAnswer = questionChoice;
        const nextDirection = actualContent.next.length === 1 ? actualContent.next[0] : actualContent.next.find(n => 'answered' in n && n.answered === lastAnswer.answer);
        if (nextDirection && 'next_question' in nextDirection) {
        setActualContentId(nextDirection.next_question);
        setQHistory(prev => [...prev, lastAnswer]);
        } else { 
        // outcome screen
        const score = qHistory.reduce((acc, q) => acc + q.score, 0);
        let outcomeEntry = getOutcome(score, actualContent, mock.outcomes);
        
        if (outcomeEntry) {
            setActualContent(outcomeEntry);
            setTracker(tracker.map(entry => {
            if (entry.cls === 'future') {
                return {...entry, cls: 'history'};
            } 
            return entry;
            }));
        }
        }
    }
    const nextQuestionIsAvailable = questionChoice.id === actualContent.id;
    
    function handleBack() {
        if (qHistory.length < 1) {
        return false; // startpoint
        }
        const lastQuestion = qHistory[qHistory.length - 1];
        const newHistory = qHistory.filter(q => q.id !== lastQuestion.id);
        
        setQHistory(newHistory);
        const curQuestion = questions.find(q => q.id === lastQuestion.id);
        if (curQuestion) {
        setActualContent(curQuestion);
        setquestionChoice({} as HistoryEntry);
        }

    }

    const isFirstQuestion = actualContent.id === initialQuestionId;

    return {
        actualContent,
        handleBack,
        handleRecordChoice,
        handleContentAction,
        isFirstQuestion,
        tracker,
        questionChoice,
        nextQuestionIsAvailable,
    } 
}