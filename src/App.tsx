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

function App() {
  const [questions, setQuestions] = useState([] as Array<Question>);
  const [actualQuestion, setActualQuestion] = useState({} as Question);
  const [initialQuestionId, setInitialQuestionId] = useState('');
  const [actualQuestionId, setActualQuestionId] = useState('');
  const [qHistory, setQHistory] = useState([] as Array<HistoryEntry>);

  useEffect(() => {
    setQuestions(mock.questions as Array<Question>);
    setInitialQuestionId('is_heartburn_known');
  }, []);

  useEffect(() => {
    const questionId = actualQuestionId || initialQuestionId;
    console.log({questionId, actualQuestionId, initialQuestionId});
    const questionSet = questions.find(question => question.id === questionId);
    questionSet && setActualQuestion(questionSet);
  }, [actualQuestionId, initialQuestionId]);


  function handleAddToHIstory(newEntry: HistoryEntry) {
    setQHistory(prev => [...prev, newEntry]);
  }

  function handleGoToNextQuestion() {
    const lastAnswer = qHistory[qHistory.length - 1];
    const nextDirection = actualQuestion.next.length === 1 ? actualQuestion.next[0] : actualQuestion.next.find(n => n.answered === lastAnswer.answer);
    if (nextDirection) {
      setActualQuestionId(nextDirection.next_question);
    }
  }

  const nextQuestionIsAvailable = qHistory.some(entry => entry.id === actualQuestion.id);
  console.log({qHistory})
  return (
    <div className="checker" data-testid='component-app'>
      <CardHeader title={appTitle} />
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
