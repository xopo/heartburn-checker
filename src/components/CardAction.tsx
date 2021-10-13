type CardActionProps = {
    isDisabled: boolean;
    clickHandle: () => void;
    restart: boolean;
}

export default function CardAction({isDisabled, clickHandle, restart}: CardActionProps) {
    return(
        <div className="card-action" data-testid='component-card-action'>
            {
                restart ? 
                    <button 
                        className='restart'
                        data-testid='cca-next'
                        onClick={clickHandle}
                    >Back to the start screen</button> :
                    
                    <button 
                        data-testid='cca-next'
                        disabled={isDisabled}
                        onClick={clickHandle}
                    >Next</button>
            }
        </div>
    );
}