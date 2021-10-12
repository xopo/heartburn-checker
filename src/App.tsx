import { useState, useEffect, useCallback } from 'react';
import CardAction from './components/CardAction';
import CardContainer from './components/CardContainer';
import CardHeader from './components/CardHeader';
import mock from './mock';
import './App.scss';
import { getInitialEntry, getOutcome } from './helpers';

const appTitle = "Heartburn Checker";

export type Answer = {
  id: string;
  label: 'Yes' | 'No';
  score: number;
}

export type NextOutcome = {
  outcome: string;
  max_score?: number;
}

export type NextAction = { 
  answered: string;
  next_question: string;
}

export type Question = {
  id: string;
  question_text: string;
  answers: Array<Answer>;
  next: Array<NextAction | NextOutcome>;
}

export type HistoryEntry = {
  id: string;
  answer: string;
  score: number;
}

export type TrackerEntry = {
  id: string;
  cls: 'history' | 'future';
}

export type Outcome = {
  id: string;
  text: string;
  show_booking_button: boolean;
}

function App() {
  const initialQuestion = getInitialEntry(mock.questions as Array<Question>);//'heartburn_blood_stool';//'is_heartburn_known'
    
  const [questions, setQuestions] = useState([] as Array<Question>);
  const [actualContent, setActualContent] = useState({} as Question | Outcome);
  const [initialQuestionId, setInitialQuestionId] = useState('');
  const [actualContentId, setActualContentId] = useState('');
  const [qHistory, setQHistory] = useState([] as Array<HistoryEntry>);
  const [tracker, setTracker] = useState([] as Array<TrackerEntry>);

  function getTrackerId(id:number): string {
    return `${id} - future`;
  }

  const initialSetup = useCallback(() => {
    setQHistory([]);
    setInitialQuestionId(initialQuestion);
    setActualContentId(initialQuestion);
    const trackerList = [];
    trackerList[0] = {id: initialQuestion, cls: 'history'};
    for (let i = 0; i <= mock.questions.length - 2; i ++ ) {
      trackerList.push({id: getTrackerId(i), cls: 'future'});
    }
    setTracker(trackerList as Array<TrackerEntry>);
  }, []);

  useEffect(() => {
    setQuestions(mock.questions as Array<Question>);
    initialSetup();
  }, [initialSetup]);

  useEffect(() => {
    console.log({actualContentId, initialQuestionId})
    const questionId = actualContentId || initialQuestionId;
    const questionSet = questions.find(question => question.id === questionId);
    questionSet && setActualContent(questionSet);
  }, [actualContentId, initialQuestionId, questions]);


  function handleAddToHIstory(newEntry: HistoryEntry) {
    setQHistory(prev => [...prev, newEntry]);
  }

  function handleContentAction() {
    if ('show_booking_button' in actualContent) {  // should reset
      initialSetup();
      return;
    }
    const lastAnswer = qHistory[qHistory.length - 1];
    const nextDirection = actualContent.next.length === 1 ? actualContent.next[0] : actualContent.next.find(n => 'answered' in n && n.answered === lastAnswer.answer);
    if (nextDirection && 'next_question' in nextDirection) {
      setActualContentId(nextDirection.next_question);
      const firstEmptyId = tracker.findIndex(entry => entry.cls === 'future'); 
      const newTracker = tracker.map((entry, id) => {
        if (entry.id === getTrackerId(firstEmptyId - 1) && entry.cls !== 'history') {
          return {id: nextDirection.next_question, cls: 'history'}
        }
        return entry;
      })
      setTracker(newTracker as Array<TrackerEntry>);
    } else {
      const score = qHistory.reduce((acc, q) => acc + q.score, 0);
      let outcomeEntry = getOutcome(score, actualContent, mock.outcomes);
      
      if (outcomeEntry) {
        setActualContent(outcomeEntry);
      }
    }
  }

  const nextQuestionIsAvailable = qHistory.some(entry => entry.id === actualContent.id);
  
  function handleBack() {
    if (qHistory.length < 1) {
      return false; // startpoint
    }
    const previousQuestion = qHistory[qHistory.length - 1];
    const newHistory = qHistory.filter(q => q.id !== previousQuestion.id)
    setQHistory(newHistory);
    const curQuestion = questions.find(q => q.id === previousQuestion.id);
    if (curQuestion) {
      setActualContent(curQuestion);
    }

  }

  return (
    <div className="checker" data-testid='component-app'>
      <CardHeader title={appTitle} tracker={tracker} handleBack={handleBack}/>
      <CardContainer {...
        {
          ...actualContent, 
          setHistory: handleAddToHIstory
        }}/>
      <CardAction 
        isDisabled={!nextQuestionIsAvailable} 
        clickHandle={handleContentAction}
        restart={ 'show_booking_button' in actualContent }
      />
    </div>
  );
}

export default App;
