const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(identifier) {
    return emailRegex.test(identifier);
}

module.exports = validateEmail;