const mongoose = require('mongoose');
const store = mongoose.model('store');
exports.createStore = async (req,res)=>{
    await new store(req.body).save() 
    res.redirect('/')
}

//multer storage
const multer = require('multer') //permits multipart forms
const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter(req,file,next){
        const isPhoto = file.mimetype.startsWith('image/')
        if(isPhoto){
            next(null,true)
        } else{
            next({message : 'this filetype is not allowed'})
        }
    }
}
exports.upload = multer(multerOptions).single('photo');
const uuid = require('uuid'); //generate unique token
const jimp = require('jimp'); //resize images
exports.resize = async (req,res,next)=>{
    if(!req.file){
        next();
        return;
    }
    const extension = req.file.mimetype.split('/')[1];
    req.body.photo = `${uuid.v4()}.${extension}`;
    const photo = await jimp.read(req.file.buffer);
    await photo.resize(800,jimp.AUTO);
    await photo.write(`${process.cwd()}/public/uploads/photos/${req.body.photo}`);
    next();
}