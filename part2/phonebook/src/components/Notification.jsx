export const Notification = ({message, style}) => {
    if(message === null){
        return null
    }
    return (
        <article className={`notification ${style}`}>
            {message}
        </article>
    )
}