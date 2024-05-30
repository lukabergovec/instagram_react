var CommentsModel = require('../models/commentsModel.js');

/**
 * commentsController.js
 *
 * @description :: Server-side logic for managing commentss.
 */
module.exports = {

    /**
     * commentsController.list()
     */
    list: function (req, res) {
        CommentsModel.find(function (err, comments) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting comments.',
                    error: err
                });
            }

            return res.json(comments);
        });
    },

    /**
     * commentsController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        CommentsModel.findOne({_id: id}, function (err, comments) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting comments.',
                    error: err
                });
            }

            if (!comments) {
                return res.status(404).json({
                    message: 'No such comments'
                });
            }

            return res.json(comments);
        });
    },

    /**
     * commentsController.create()
     */
    create: function (req, res) {
        var comments = new CommentsModel({
			comm : req.body.comm,
			date : new Date(),
			img_id : req.body.img_id,
			img_owner : req.session.userId
        });

        comments.save(function (err, comments) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating comments',
                    error: err
                });
            }

            return res.status(201).json(comments);
        });
    },

};
