import { useState } from 'react';
import { Answer, HistoryEntry, Question } from "../App";

type CardContainerProps = Question & 
    {
        setHistory:  (obj: HistoryEntry) => void;
    }

export default function CardContainer({id, question_text, answers, setHistory}: CardContainerProps) {
    const [selected, setSelected] = useState('');
    function handleSelected(setid:string) {
        setSelected(setid);
        const answerdObject = {
            id,
            answer: setid,
            score: (answers.find(answ => answ.id === setid) as Answer).score
        }
        setHistory(answerdObject as HistoryEntry);
    }
    console.log({id, question_text, answers})
    return (
        <div className="card-content">
            <div className="question">{question_text}</div>
            <div className='choice'>
                {answers && answers.map(({id, label, score}: Answer) => (
                    <button 
                        key={id}
                        onClick={() => handleSelected(id)}
                        className={selected && selected === id ? 'selected' : ''}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}