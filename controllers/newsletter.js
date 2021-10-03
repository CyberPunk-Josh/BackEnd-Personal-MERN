const Newsletter = require('../models/newsletter');

exports.suscribeEmail = async(req, res) => {
    try{
        const { email } = req.body;

        let newsletter = await Newsletter.findOne({email});

        if(newsletter){
            res.status(400).send({message: 'Email already registered'});
            return;
        } else {
            newsletter = new Newsletter(req.body)
            newsletter.email = email;

            await newsletter.save((err, newsletterStored) => {
                if(err){
                    res.status(500).send({message: 'Server Error'});
                } else {
                    res.status(200).send({message: 'Email saved successfully'});
                }
            })
        }

    }catch(error){
        console.log(error)
        res.status(400).send({message: 'Something went wrong'})
    }
}