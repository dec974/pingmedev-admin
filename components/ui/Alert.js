
function Alert({ message, type }) {
    const alertStyles = {
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '10px',
        color: '#fff',
        backgroundColor: type === 'error' ? '#f44336' : '#4CAF50',
    };

    return (
        <div style={alertStyles}>
            {message}
        </div>
    );
}

export default Alert;