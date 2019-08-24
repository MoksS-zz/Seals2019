const UserM = require('../models/moksModel');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const uuid = require('uuidv4');



//seting for multer 

let storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb,){
        req.body.avatar = uuid() + "" + file.originalname;
        cb(null, req.body.avatar);
    }
});

exports.upload = multer({
    storage:storage,
    fileFilter: checkFileType
}).single('avatar');

function checkFileType(req,file, cb) {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase());
    
    const mimetype = fileTypes.test(file.mimetype);
    if(mimetype && extname){
        return cb(null,true);
    }else{
        cb('Error:Только Картинки');
    };
};



exports.getReginster = async (req, res) => {
    const userMain =  req.locals;

    if(userMain.status){
        res.redirect('/ciberlexa');
    };
    res.render('moks/userRegister',{
        userMain,
        msg: null
    });
}

exports.getMainPage = async (req, res) => {
    const userMain =  req.locals;
    res.render('moks/landing', {
        userMain,
        msg: null
    });
};

exports.getLogin = async (req,res) => {
    const userMain = req.locals;
    res.render('moks/login',{
        userMain,
        msg: null
    });
};


exports.postRegister = async (req, res) => {
    const userMain =  req.locals;
    
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        res.render('moks/login',{
            userMain,
            msg: error
        });
    }

    const hash = crypto.createHmac('sha256', 'SEALS')
            .update(req.body.password)
            .digest('hex');

    const cookie = crypto.createHmac('sha256', 'SEALS')
    .update(uuid())
    .digest('hex');

    console.log('MOKS this is a new user: ' + req.body.name + ' ' + req.body.avatar + " " + hash + ' ' + req.body.email);
    
    UserM.sync({force: true}).then(() => {
        // Table created
        UserM.create({
            name:req.body.name,
            password:hash,
            avatar:req.body.avatar,
            email:req.body.email,
            phone:req.body.phone + '',
            cookie:cookie
        })
        .then(user => {
            console.log(`MOKS this is a new user: 
            NAME: ${user.name} 
            AVATAR: ${user.avatar}
            PASSWORD: ${hash}
            EMAIL: ${user.email}
            phone: ${user.phone}
            link: ${user.link}
            score:${user.score}`);

            res.cookie('seals',cookie, { maxAge:86400000, httpOnly: true });
            res.redirect('/ciberlexa');
        })
        .catch(err =>{
            res.render('moks/userRegister', {
                userMain,
                msg: err
                });
            console.log(err);
        });
    });


    // UserM.create({
    //         name:req.body.name,
    //         password:hash,
    //         avatar:req.body.avatar,
    //         email:req.body.email,
    //         phone:req.body.phone + '',
    //         cookie:cookie
    //     })
    //     .then(user => {
    //         console.log(`MOKS this is a new user: 
    //         NAME: ${user.name} 
    //         AVATAR: ${user.avatar}
    //         PASSWORD: ${hash}
    //         EMAIL: ${user.email}
    //         phone: ${user.phone}`);

    //         res.cookie('seals',cookie, { maxAge:86400000, httpOnly: true });
    //         res.status(201).send('ok');
    //     })
    //     .catch(err =>{
    //         res.render('moks/moks', {
    //             msg: err
    //           });
    //         console.log(err);
    //     });
        
};

exports.postLogin = async (req , res) => {
    let userMain =  req.locals;
    const hash = crypto.createHmac('sha256', 'SEALS')
                   .update(req.body.password)
                   .digest('hex');
    UserM.findOne({
        where: { name : req.body.name},
        attributes:['password' , 'cookie']
    })
    .then(user => {
        if(user.password === hash){
            console.log(`${req.body.name} авторизировался`)
            res.cookie('seals',user.cookie, { maxAge:86400000, httpOnly: true });
            res.redirect('/ciberlexa')
        }else{
            res.render('moks/login',{
                userMain,
                msg: 'Неверный Пароль'
            });
        }
    })
    .catch(err =>{
        res.render('moks/login',{
            userMain,
            msg: 'Пользователя с таким именем не существует' 
        });
    })
};


exports.getLogout = async  (req,res) => {
    res.clearCookie('seals');
    res.redirect('/');
};

