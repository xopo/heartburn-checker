import { useState, useEffect } from 'react';
import CardAction from './components/CardAction';
import CardContainer from './components/CardContainer';
import CardHeader from './components/CardHeader';
import mock from './mock';
import './App.scss';

const appTitle = "Heartburn Checker";

export type Answer = {
  id: string;
  label: 'Yes' | 'No';
  score: number;
}

type NextAction = { 
  answered: string;
  next_question: string;
}

export type Question = {
  id: string;
  question_text: string;
  answers: Array<Answer>;
  next: Array<NextAction>;
}

export type HistoryEntry = {
  id: string;
  answer: string;
  score: number
}

export type TrackerEntry = {
  id: string;
  cls?: 'history' | 'future';
}

function App() {
  const [questions, setQuestions] = useState([] as Array<Question>);
  const [actualQuestion, setActualQuestion] = useState({} as Question);
  const [initialQuestionId, setInitialQuestionId] = useState('');
  const [actualQuestionId, setActualQuestionId] = useState('');
  const [qHistory, setQHistory] = useState([] as Array<HistoryEntry>);
  const [tracker, setTracker] = useState([] as Array<TrackerEntry>);

  function getTrackerId(id:number): string {
    return `${id} - future`;
  }

  useEffect(() => {
    const initialQuestion = 'is_heartburn_known'
    setQuestions(mock.questions as Array<Question>);
    setInitialQuestionId(initialQuestion);
    const trackerList = [];
    trackerList[0] = {id: initialQuestion, cls: 'history'};
    for (let i = 0; i <= mock.questions.length - 2; i ++ ) {
      trackerList.push({id: getTrackerId(i), cls: 'future'});
    }
    setTracker(trackerList as Array<TrackerEntry>);
  }, []);

  useEffect(() => {
    const questionId = actualQuestionId || initialQuestionId;
    console.log({questionId, actualQuestionId, initialQuestionId});
    const questionSet = questions.find(question => question.id === questionId);
    questionSet && setActualQuestion(questionSet);
  }, [actualQuestionId, initialQuestionId, questions]);


  function handleAddToHIstory(newEntry: HistoryEntry) {
    setQHistory(prev => [...prev, newEntry]);
  }

  function handleGoToNextQuestion() {
    const lastAnswer = qHistory[qHistory.length - 1];
    const nextDirection = actualQuestion.next.length === 1 ? actualQuestion.next[0] : actualQuestion.next.find(n => n.answered === lastAnswer.answer);
    if (nextDirection) {
      setActualQuestionId(nextDirection.next_question);
      const firstEmptyId = tracker.findIndex(entry => entry.cls === 'future'); 
      const newTracker = tracker.map((entry, id) => {
        if (entry.id === getTrackerId(firstEmptyId - 1) && entry.cls !== 'history') {
          return {id: nextDirection.next_question, cls: 'history'}
        }
        return entry;
      })
      //  tracker.splice(firstEmptyId, 1, );
      setTracker(newTracker as Array<TrackerEntry>);
    }
  }

  const nextQuestionIsAvailable = qHistory.some(entry => entry.id === actualQuestion.id);
  console.log({qHistory})
  return (
    <div className="checker" data-testid='component-app'>
      <CardHeader title={appTitle} tracker={tracker}/>
      <CardContainer {...
        {
          ...actualQuestion, 
          setHistory: handleAddToHIstory
        }}/>
      <CardAction isDisabled={!nextQuestionIsAvailable} clickHandle={handleGoToNextQuestion}/>
    </div>
  );
}

export default App;
