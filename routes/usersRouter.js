const { Router } = require('express');
const usersRouter = Router();
const usersController = require('../controller/usersController');

usersRouter.route('/')
    .get(usersController.userCreateList);

usersRouter.route('/new')
    .get(usersController.userCreateGet)
    .post(usersController.userCreatePost);

usersRouter.route('/search')
    .get(usersController.userSearchGet)
    // .post(usersController.userSearchPost);

module.exports = usersRouter;