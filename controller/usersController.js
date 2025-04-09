const { body, validationResult, query } = require("express-validator");

const alphaError = 'Username must only contain letters';
const lenghtError = 'Input field must be at least 3 characters long';


const validateUSer = [
    body('userName').trim()
        .isLength({ min: 3 }).withMessage(lenghtError)
        .isAlpha().withMessage(alphaError)
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
        const { userName } = req.body; // this is WIP and will need to be sent to the database
        res.redirect('/');
    }
]