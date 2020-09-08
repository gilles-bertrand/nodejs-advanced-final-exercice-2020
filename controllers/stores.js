exports.createStore = (req,res)=>{
    console.log(req.body)
    res.redirect('/')
}
//multer storage
const multer = require('multer')
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
exports.upload = multer(multerOptions).single('photo')