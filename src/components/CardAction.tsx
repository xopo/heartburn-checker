type CardActionProps = {
    isDisabled: boolean;
    clickHandle: () => void;
    restart: boolean;
}

export default function CardAction({isDisabled, clickHandle, restart}: CardActionProps) {
    return(
        <div className="card-action">
            {
                restart ? 
                <button className='restart'
                    onClick={clickHandle}
                >Back to the start screen</button>:
                <button 
                    disabled={isDisabled}
                    onClick={clickHandle}
                >Next</button>
            }
        </div>
    );
}