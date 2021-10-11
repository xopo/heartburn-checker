type CardActionProps = {
    isDisabled: boolean;
    clickHandle: () => void;
}

export default function CardAction({isDisabled, clickHandle}: CardActionProps) {
    return(
        <div className="card-action">
            <button 
                disabled={isDisabled}
                onClick={clickHandle}
            >Next</button>
        </div>
    );
}