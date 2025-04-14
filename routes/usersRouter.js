const { Router } = require('express');
const usersRouter = Router();
const usersController = require('../controller/usersController');

usersRouter.route('/')
    .get(usersController.userCreateList)

usersRouter.route('/new')
    .get(usersController.userCreateGet)
    .post(usersController.userCreatePost);

usersRouter.route("/:id/delete")
    .post(usersController.userDeletePost);
    
module.exports = usersRouter;