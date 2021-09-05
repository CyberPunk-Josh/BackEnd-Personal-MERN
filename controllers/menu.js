const Menu = require('../models/menu');

// create a menu
exports.addMenu = async (req, res) => {
    
    try{
        const { title, url, order, active } = req.body;
        const menu = new Menu();
        menu.title = title;
        menu.url = url;
        menu.order = order;
        menu.active = active;

        await menu.save((err, menuStored) => {
            if(err){
                res.status(500).send({message: 'Server Error'});
            } else {
                res.status(200).send({message: 'Menu created successfully'});
            }
        })
    } catch(error){
        console.log(error)
        res.status(400).send({message: 'Something went wrong'})
    }

};

// get all menu's 
exports.getMenu = async (req, res) => {
    try{
        await Menu.find().then(menus => {
            if(!menus){
                res.status(404).send({message: 'No data for menus'});
            } else {
                res.status(200).send({menus: menus });
            }
        })
    } catch(error){
        console.log(error)
        res.status(400).send({message: 'Something went wrong'})
    }
}