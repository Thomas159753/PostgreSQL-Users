const { Router } = require('express');
const usersRouter = Router();
const usersController = require('../controller/usersController');

usersRouter.route('/')
    .get((req, res) => {
        console.log("GET /users - usernames will be logged here - WIP");
        res.send("Usernames will be logged here - WIP");
    });

usersRouter.route('/new')
    .get(usersController.userCreateGet)
    .post(usersController.userCreatePost);

module.exports = usersRouter;