import generateRandomString from '../utils/randomStringGenerator.js';

const assignRandomPrefix = (req, res, next) => {
    req.randomPrefix = generateRandomString(20); // Generate and set the random prefix
    next(); // Call the next middleware
};

export default assignRandomPrefix;