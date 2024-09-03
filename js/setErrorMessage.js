export function setErrorMessage(errorMessage, element) {
    const existingMessage = document.getElementById('error-message');

    if (!existingMessage) {
        const message = document.createElement('p');
        message.id = 'error-message';
        message.textContent = errorMessage;
    
        element.appendChild(message);
    }
}