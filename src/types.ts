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

export type ApiData = {
    questions: Array<Question>;
    outcomes: Array<Outcome>;
}