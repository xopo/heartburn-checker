type HeaderProps = {
    title: string,
}

export default function CardHeader({title}:HeaderProps) {
    return(
        <div 
            className="card-header"
            data-testid='component-card-header'
        >
            <div 
                className='header-action'
                data-testid='cch-action'
            >.</div>
            <div 
                className='header-title'
                data-testid='cch-title'
            >{title}</div>
        </div>
    );
}