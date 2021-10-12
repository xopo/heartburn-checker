import { TrackerEntry } from "../App";

type HeaderProps = {
    title: string;
    tracker: Array<TrackerEntry>;
    handleBack: () => void;
}

export default function CardHeader({title, tracker, handleBack}:HeaderProps) {
    return(
        <div 
            className="card-header"
            data-testid='component-card-header'
        >
            <div className="row">
                <div 
                    className='header-action'
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