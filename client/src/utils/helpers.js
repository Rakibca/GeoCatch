// Email validation
export function validateEmail(email) {
    var match = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return match.test(String(email).toLowerCase());
}