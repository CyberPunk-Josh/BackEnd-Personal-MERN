const express = require('express');
const PostContoller = require('../controllers/post');

const md_auth = require('../middlewares/authenticated');

const api = express.Router();

api.post('/add-post',[md_auth.ensureAuth], PostContoller.addPost);
api.get('/get-post', PostContoller.getPost);
api.put('/update-post/:id',[md_auth.ensureAuth], PostContoller.updatePost);
api.delete('/delete-post/:id',[md_auth.ensureAuth], PostContoller.deletePost);
api.get('/get-one-post/:url', PostContoller.getUniquePost);

module.exports = api;