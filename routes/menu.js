const express = require('express');
const MenuController = require('../controllers/menu');

// middleware
const md_auth = require('../middlewares/authenticated');

const api = express.Router();

// end points
api.post('/add-menu', [md_auth.ensureAuth], MenuController.addMenu);
api.get('/get-menus', [md_auth.ensureAuth], MenuController.getMenu);

module.exports = api;
