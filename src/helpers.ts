import { NextOutcome, Outcome, Question } from "./App";

export function getOutcome(score: number, outcomeOptions: Question | Outcome, outcomes: Array<Outcome>) {
    let outcomeObj = {} as  NextOutcome;
    if (score < 6) {
        outcomeObj = (outcomeOptions as Question).next.find(n => 'max_score' in n && n.max_score === 5) as NextOutcome;
    } else if (score < 50) {
        outcomeObj = (outcomeOptions as Question).next.find(n => 'max_score' in n && n.max_score === 49) as NextOutcome;
    } else {
        outcomeObj = (outcomeOptions as Question).next.find(n => !('max_score' in n)) as NextOutcome;
    }
    return outcomes.find(out => out.id === outcomeObj.outcome);
}

export function getInitialEntry(entries: Array<Question>) {
    const keysIsCalled = {} as {[key: string]: number};
    if (entries.length) {
        for(const entry of entries) {
            // it is already in keyIsCalled or  is the last question;
            keysIsCalled[entry.id] = entry.id in keysIsCalled || 'outcome' in entry.next[0]  ? 1 : 0; 
            for(const nextEntry of entry.next) {
                if ('next_question' in nextEntry) {
                    keysIsCalled[nextEntry.next_question] = 1;
                }
            }   
        }
    }
    return Object.keys(keysIsCalled).find(key => keysIsCalled[key] === 0) || '';
}