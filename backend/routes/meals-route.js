const express= require('express')
const {check}= require('express-validator')
const router=express.Router();
const mealsControllers=require('../controllers/meals-controllers')
const fileUpload= require('../middleware/file-upload')
const checkAuth= require('../middleware/check-auth')


router.patch('/:mid/likePost',mealsControllers.likePost)
router.patch('/:mid/dislikePost',mealsControllers.dislikePost)

router.get('/:mid', mealsControllers.getMealById)

router.get('/user/:uid', mealsControllers.getMealsByUserId)

router.get('/',mealsControllers.getAllMeals)

router.use(checkAuth)

router.post(
    '/',
    fileUpload.single('image'),
    [
        check('name').not().isEmpty(), 
        check('description').isLength({min:3})
    ],
    mealsControllers.createMeal
)


router.patch(
    '/:mid', 
    [
        check('name').not().isEmpty(), 
        check('description').isLength({min:3})
    ],
    mealsControllers.updateMealById)
router.delete('/:mid', mealsControllers.deleteMealById)



module.exports=router