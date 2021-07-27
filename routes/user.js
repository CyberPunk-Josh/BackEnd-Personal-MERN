const express = require('express');
const multipart = require('connect-multiparty');
const UserController = require('../controllers/user');

// middlewares
const md_auth = require('../middlewares/authenticated');
const md_upload_avatar = multipart({ uploadDir: './uploads/avatar'});

const api = express.Router();

// end point:
api.post('/sign-up', UserController.signUp);
api.post('/sign-in', UserController.singIn);
api.get('/users', [md_auth.ensureAuth], UserController.getUsers);
api.get('/users-active', [md_auth.ensureAuth], UserController.getUsersActive);
api.put('/upload-avatar/:id', [md_auth.ensureAuth, md_upload_avatar], UserController.uploadAvatar);
api.get('/get-avatar/:avatarName', UserController.getAvatar);
api.put('/update-user/:id', [md_auth.ensureAuth], UserController.updateUser);

module.exports = api;