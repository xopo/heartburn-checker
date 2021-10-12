import { useState } from 'react';
import { Answer, HistoryEntry, NextAction, NextOutcome } from "../App";

type CardContainerProps = {
    answers?: Array<Answer>;
    id: string;
    question_text?: string;
    text?: string;
    next?: Array<NextAction | NextOutcome>;
    show_booking_button?: boolean;
    setHistory:  (obj: HistoryEntry) => void;
};

export default function CardContainer({id, question_text, text, show_booking_button, answers, setHistory}: CardContainerProps) {
    console.log(id, question_text, answers);
    const [selected, setSelected] = useState('');
    function handleSelected(setid:string) {
        setSelected(setid);
        const answerdObject = {
            id,
            answer: setid,
            score: (((answers && answers.find(answ => answ.id === setid)) || { score: 0 }) as Answer ).score
        }
        setHistory(answerdObject as HistoryEntry);
    }
    const title = question_text || 'Thank you for answering the question';
    console.log({id, question_text, answers})
    return (
        <div className="card-content">
            <div className="question">{ title }</div>
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
                <div className={answers ? 'hidden' : 'outcome'}>
                    {text && <p>{text}</p>}
                    {show_booking_button && <button className='book-meeting'>Book a meeting</button>}
                </div>
            </div>
        </div>
    );
}