const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const userController = require('../controllers/userController');
/**
 * App Routes 
*/
router.get('/register', userController.showRegistrationForm);
router.post('/register', userController.registerUser );

router.get('/login', userController.showLoginForm);
router.post('/login', userController.loginUser );

router.get('/', recipeController.homepage);
router.get('/recipe/:id', recipeController.exploreRecipe );
router.get('/categories', recipeController.exploreCategories);
router.get('/categories/:id', recipeController.exploreCategoriesById);
router.post('/search', recipeController.searchRecipe);
router.get('/explore-latest', recipeController.exploreLatest);
router.get('/explore-random', recipeController.exploreRandom);
router.get('/submit-recipe', recipeController.submitRecipe);
router.post('/submit-recipe', recipeController.submitRecipeOnPost);



 
module.exports = router;