const { body, validationResult, query } = require("express-validator");

const alphaError = 'Username must only contaain letters';
const lenghtError = 'Input field must be at least 3 characters long';
const emailError = 'Email must be a valid E-mail address';

const validateUSer = [
    body('userName').trim()
        .isAlpha().withMessage(alphaError)
        .isLength({ min: 3 }).withMessage(lenghtError),
    body('email').trim()
        .isEmail().withMessage(emailError)
        .normalizeEmail()
]

exports.userCreateGet = (req, res) => {
    res.render('createUser', {
        title: 'Create User',
    })
}


exports.userCreatePost = [
    validateUSer,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('createUser', {
                title: 'Create User',
                errors: errors.array(),
            })
        }
        console.log('User Created');
        const { userName, email } = req.body; // this is WIP and will need to be sent to the database
        res.redirect('/');
        console.log({ username: userName, Email: email, Errors: errors });
    }
]