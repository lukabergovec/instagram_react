var express = require('express');
var router = express.Router();
var commentsController = require('../controllers/commentsController.js');


function requiresLogin(req, res, next){
    if(req.session && req.session.userId){
        return next();
    } else{
        var err = new Error("You must be logged in to view this page");
        err.status = 401;
        return next(err);
    }
}

/*
 * GET
 */
router.get('/', commentsController.list);

/*
 * GET
 */
router.get('/:id', commentsController.show);

/*
 * POST
 */
router.post('/', requiresLogin, commentsController.create);

module.exports = router;
