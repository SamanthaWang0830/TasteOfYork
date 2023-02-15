const express= require('express')
const {check}= require('express-validator')
const router=express.Router();
const usersControllers=require('../controllers/users-controllers')
//
const multer=require('multer')
const storage= multer.memoryStorage()
const upload=multer({storage:storage})




router.get('/', usersControllers.getUsers)
router.post(
    '/signup', 
    upload.single('image'),
    [
        check('name').not().isEmpty(),
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({min:6})
    ],
    usersControllers.signup)
router.post('/login', usersControllers.login)

module.exports=router

