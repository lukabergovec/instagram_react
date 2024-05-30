var PhotoModel = require('../models/photoModel.js');
var CommentsModel = require('../models/commentsModel');
/**
 * photoController.js
 *
 * @description :: Server-side logic for managing photos.
 */
module.exports = {

    /**
     * photoController.list()
     */
    list: function (req, res) {
        PhotoModel.find().sort([['date',-1]])
            .populate('postedBy')
            .exec(function (err, photos) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting photo.',
                        error: err
                    });
                }
                var data = [];
                data.photos = photos;
                //return res.render('photo/list', data);
                return res.json(photos);
            });
    },

    /**
     * photoController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        var data={photo:null,comment:null};
        PhotoModel.findOne({_id: id}).populate('postedBy').exec(function(err, photo){
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo.',
                    error: err
                });
            }

            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            CommentsModel.find({img_id: id}).sort([['date',-1]]).populate('img_owner').exec(function(err, answers){
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting comments.',
                        error: err
                    });
                }
                //return here
                data.photo=photo;
                data.comment=answers;
                return res.json(data);
            })
        });
    },

    /**
     * photoController.create()
     */

    getByTags: function (req,res){
        PhotoModel.find({tags:{$in: req.body.tags.split(" ")}},function(err,tags){
            if (err) {
                return res.status(500).json({
                    message: 'Error when searching by tags',
                    error: err
                });
            }
            console.log(tags)
            return res.status(201).json(tags);
        })
    },

    create: function (req, res) {
        var photo = new PhotoModel({
            name : req.body.name,
            path : "/images/"+req.file.filename,
            postedBy : req.session.userId,
            reports : 0,
            likes : 0,
            disabled:false,
            date: new Date(),
            tags:req.body.tags.split(" ")
        });

        photo.save(function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating photo',
                    error: err
                });
            }

            return res.status(201).json(photo);
            //return res.redirect('/photos');
        });
    },

    report:function(req,res){
        var id = req.params.id;
        PhotoModel.findById(id,function(err,photo){
            if (err) {
                return res.status(500).json({
                    message: 'Error when searching for photo',
                    error: err
                });
            }
            console.log(JSON.stringify(photo))
            photo.reports+=1;
            if(photo.reports>=3){
                photo.disabled=true;
            }
            photo.save(function(err,photo){
                if (err) {
                    return res.status(500).json({
                        message: 'Error.',
                        error: err
                    });
                }
            })
        })
    },

    like:function(req,res){
        var id = req.params.id;
        PhotoModel.findById(id,function(err,photo){
            if (err) {
                return res.status(500).json({
                    message: 'Error when searching for photo',
                    error: err
                });
            }
            console.log(JSON.stringify(photo))
            photo.likes+=1;
            photo.save(function(err,photo){
                if (err) {
                    return res.status(500).json({
                        message: 'Error.',
                        error: err
                    });
                }
            })
        })
    },

    dislike:function(req,res){
        var id = req.params.id;
        PhotoModel.findById(id,function(err,photo){
            if (err) {
                return res.status(500).json({
                    message: 'Error when searching for photo',
                    error: err
                });
            }
            console.log(JSON.stringify(photo))
            photo.likes-=1;
            photo.save(function(err,photo){
                if (err) {
                    return res.status(500).json({
                        message: 'Error.',
                        error: err
                    });
                }
            })
        })
    },

    publish: function(req, res){
        return res.render('photo/publish');
    }
};
