

export const ButtonC = ({title, className, functionEmit}) => {
    return (
        <div className="{className}" onClick={functionEmit}>{title}</div>
    )
}