//Thais component is a basic container for displaying user-resources

export function DisplayCard( {children}
: {
    children: React.ReactElement,
}){

    return (
        <div className={'card '}>
            {children}
        </div>
    )
}