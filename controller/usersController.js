const { body, validationResult, query } = require("express-validator");
const db = require("../database/queries");

const alphaError = 'Username must only contain letters';
const lenghtError = 'Input field must be at least 3 characters long';


const validateUSer = [
    body('userName').trim()
        .isLength({ min: 3 }).withMessage(lenghtError)
        .isAlpha().withMessage(alphaError)
]

exports.userCreateList = async (req, res) => {
    const users = await db.getAllUsersnames();
    res.render('listUsers', {
        title: 'All Users',
        users,
    })
}

exports.userCreateGet = async (req, res) => {
    res.render('createUser', {
        title: 'Create User',
    })
}

exports.userSearchGet = async (req, res) => {
    const { search } = req.query;
    const usernames = await db.searchByUsername(search);
    res.render('listUsers', {
        title: 'Search Results',
        users: usernames,
        value: search, // something wrong with this
        //also search?search=Odin :|
    })
}

exports.userCreatePost = [
    validateUSer,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('createUser', {
                title: 'Create User',
                errors: errors.array(),
            })
        }
        console.log('User Created');
        const { userName } = req.body;
        await db.insertUsername(userName);
        res.redirect('/');
    }
]