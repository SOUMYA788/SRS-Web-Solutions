/**
 * 
 * @param {String} email 
 * @returns {Boolean} true or false, if email is valid then true otherwise false.
 */
export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};