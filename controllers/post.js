const Post = require('../models/post');

exports.addPost = async(req, res) => {
    const body = req.body;
    const post = new Post(body);

    try{
        await post.save((err, postStoraged) => {
            if(err){
                res.status(500).send({code: 500, message: 'This url already exists'});
            } else {
                res.status(200).send({code: 200, message: 'Post created successfully'});
            }
        });

    } catch(err){
        res.status(500).send({message: "Server error"})
    }
}

exports.getPost =  async(req, res) => {
    const { page = 1, limit = 10} = req.query;

    const options = {
        page,
        limit: parseInt(limit),
        sort: {date: 'desc'}
    };

    try{

        await Post.paginate({}, options, (err, postStoraged) => {
            if(err){
                res.status(500).send({ code: 500, message: 'Server error' });
                return;
            } else {
                if(!postStoraged){
                    res.status(404).send({ code: 404, message: 'Post not found' });
                    return;
                } else {
                    res.status(200).send({ code: 200, message: postStoraged});
                }
            }
        })


    } catch(err){
        res.status(500).send({message: "Server error"});
    }
}

exports.updatePost = async(req, res) => {
    // data to update:
    const postData = req.body;

    // id to find post
    const params = req.params;

    try{

        let postToUpdate = await Post.findByIdAndUpdate({ _id: params.id}, postData);
        if(!postToUpdate){
            res.status(404).send({code: 404, message: 'Post not found'});
            return;
        } else {
            res.status(200).send({code: 200, message: 'Post updated successfully'});
        }

    } catch(err){
        res.stattus(500).send({code: 500, message: 'Server error'});
    }

}

exports.deletePost = async(req, res) => {
    const params = req.params;

    try{

        let postDeleted = await Post.findByIdAndRemove( { _id: params.id});

        if(!postDeleted){
            res.status(404).send({code: 404, message: 'Post not found'});
            return;
        } else {
            res.status(200).send({code: 200, message: 'Post deleted successfully'});
        }

    }catch(err){
        res.status(500).send({code: 500, message: 'Server error'});
    }
}

exports.getUniquePost = async(req, res) => {
    const {url} = req.params;

    try{

        let postStoraged = await Post.findOne({url});

        if(!postStoraged) {
            res.status(404).send({code: 404, message: 'Post not found'});
        } else {
            res.status(200).send({code: 200, message: postStoraged});
        }

    } catch(err){
        res.status(500).send({code: 500, message: 'Server error'});
    }
}