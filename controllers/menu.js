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

// update menu
exports.updateMenu = async (req, res) => {
    let menuData = req.body;
    const params = req.params;

    try {
        let menuUpdated = await Menu.findByIdAndUpdate({ _id: params.id}, menuData);
        
        if(!menuUpdated){
            res.status(404).send({message: 'Menu not found'});
            return;
        } else{
            res.status(200).send({message: 'Menu updated successfully'});
        }

    } catch(error){
        console.log(error)
        res.status(400).send({message: 'Something went wrong'})
    }
} 

// activate a menu
exports.activateMenu = async (req, res) => {
    const params = req.params;
    const { active } = req.body;

    try{
        let menuToActivate = await Menu.findByIdAndUpdate( { _id: params.id}, { active});

        if(!menuToActivate){
            res.status(404).send({message: 'Menu not found'});
            return;
        }

        if(active == true){
            res.status(200).send({message: 'Menu activated'}); 
        } else{
            res.status(200).send({message: 'Menu desactivated'});
        }

    }catch(error){
        console.log(error);
        res.status(500).send({message: 'Server Error'});
    }
}

// delete menu
exports.deleteMenu = async (req, res) => {
    const params = req.params;

    try{
        let menuDeleted = await Menu.findByIdAndRemove({ _id: params.id});

        if(!menuDeleted) {
            res.status(404).send({message: 'Menu not found'});
            return;
        } else {
            res.status(200).send({message: 'Menu deleted successfully'});
        }

    }catch(error){
        console.log(error);
        res.status(500).send({message: 'Server Error'});
    }
}