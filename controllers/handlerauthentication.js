const UserM = require('../models/moksModel');

async function isLoggedIn (req,res, next) {
        req.locals = {};
    try {
        let user = await UserM.findOne({
            where: { cookie : req.cookies.seals},
            attributes:['name','avatar','id','email','phone','link','score']
        });
         req.locals.name = user.name;
         req.locals.avatar = user.avatar;
         req.locals.id = user.id;
         req.locals.status = true;
         req.locals.email = user.email;
         req.locals.phone = user.phone;
         req.locals.link = user.link;
         req.locals.score = user.score;
    } catch (error) {
         req.locals.status = false;
    }
    next();
};

module.exports = isLoggedIn