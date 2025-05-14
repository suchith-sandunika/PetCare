const Button = ({ text, classList, styles, spanList, spanText, onClick }) => {
    return (
        <button type='button' className={classList} style={styles} onClick={onClick}>
            {text}
            {spanList && (
                <span style={spanList}>{spanText}</span>
            )}
        </button>
    )
}

export default Button;
