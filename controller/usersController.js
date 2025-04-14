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
    const { search } = req.query;
    let users;
    if (search) {
        users = await db.searchByUsername(search);
    } else{
        users = await db.getAllUsersnames();
    }
    res.render('listUsers', {
        title: 'User List',
        users,
        value: search || '',
    })
}

exports.userCreateGet = async (req, res) => {
    res.render('createUser', {
        title: 'Create User',
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

exports.userDeletePost = async (req, res) => {
    const { id } = req.params;
    await db.deleteUsername(id);
    res.redirect('/');
    console.log('User Deleted');
}