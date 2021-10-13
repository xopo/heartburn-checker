import { memo } from 'react';
import { Answer, HistoryEntry, NextAction, NextOutcome } from "../types";

type CardContainerProps = {
    answers?: Array<Answer>;
    id: string;
    question_text?: string;
    text?: string;
    next?: Array<NextAction | NextOutcome>;
    show_booking_button?: boolean;
    setHistory?:  (obj: HistoryEntry) => void;
    selectedAnswer?: string;
};

function CardContainer({id, question_text, text, show_booking_button, answers, setHistory, selectedAnswer}: CardContainerProps) {
    function handleSelected(setid :string) {
        const answerdObject = {
            id,
            answer: setid,
            score: (((answers && answers.find(answ => answ.id === setid)) || { score: 0 }) as Answer ).score
        }
        setHistory && setHistory(answerdObject as HistoryEntry);
    }
    const title = question_text || 'Thank you for answering the question';

    return (
        <div className="card-content" data-testid='component-card-container'>
            <div className="question" data-testid='ccc-question'>{ title }</div>
            <div className='choice'>
                {answers && answers.map(({id: answerId, label}: Answer) => (
                    <button 
                        data-testid="ccc-answer-button"
                        key={answerId}
                        onClick={() => handleSelected(answerId)}
                        className={selectedAnswer && selectedAnswer === answerId ? 'selected' : ''}
                    >
                        {label}
                    </button>
                ))}
                <div className={answers ? 'hidden' : 'outcome'}
                    data-testid='ccc-outcome'
                >
                    {text && <p data-testid='ccc-outcome-text'>{text}</p>}
                    {show_booking_button && 
                        <button 
                            className='book-meeting'
                            data-testid='ccc-book-button'
                        >
                            Book a meeting
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}

export default memo(CardContainer);