import { TrackerEntry } from "../types";

type HeaderProps = {
    title: string;
    tracker: Array<TrackerEntry>;
    handleBack: () => void;
    actionIsDisabled?: boolean;
}

export default function CardHeader({title, tracker, handleBack, actionIsDisabled}:HeaderProps) {
    const actionClass = `header-action${actionIsDisabled ? ' hidden' : ''}`
    return(
        <div 
            className="card-header"
            data-testid='component-card-header'
        >
            <div className="row">
                <div 
                    className={actionClass}
                    data-testid='cch-action'
                    onClick={handleBack}
                >.</div>
                <div 
                    className='header-title'
                    data-testid='cch-title'
                >{title}</div>
            </div>
            <ul>
                {tracker.map(({id, cls}) => <li key={id} className={cls}  />)}
            </ul>
        </div>
    );
}