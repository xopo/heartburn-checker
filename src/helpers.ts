import { NextOutcome, Outcome, Question } from "./types";

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
