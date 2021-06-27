const router = require("express").Router();
const moviesController = require("../controllers/moviesController.js");
const authenticate = require('../middleware/authenticate.js');


// CRUD

router.get('/', async (req, res) => {
    try {
        res.json(await moviesController.findTopRated());
    }catch (err) {
        return res.status(500).json({
        message: err.message
        });
    }
});



router.get('/popular', async (req, res) => {
    try {
        res.json(await moviesController.findPopular());
    }catch (err) {
        return res.status(500).json({
        message: err.message
        });
    }
});

//Búsqueda de película por ID
router.post('/id', async (req, res)=> {             //id/:id
    try {
        let id = req.body.id;
        res.json(await moviesController.searchById(id));
        
    } catch (err) {
        return res.status(500).json({
            mensaje: err.message
        });
    }
});

// Getting movies by title

router.post('/title', async (req, res)=> {
    try {  
        let title = req.body.title;
        res.json(await moviesController.searchByTitle(title));
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

router.post('/actor', async (req, res)=> {
    try {  
        let actor = req.body.actor;
        res.json(await moviesController.searchByAct(actor));
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

router.post('/genre', async (req, res)=> {
    try {
        let movieGenre = req.body.genre;
        movieGenre = movieGenre.charAt(0).toUpperCase() + movieGenre.slice(1);
        res.json(await moviesController.searchByGenre(movieGenre));
    } catch (err) {
        return res.status(500).json({
            mensaje: err.message
        });
    }
});


//Traer películas recomendadas sobre un ID de una película
router.post('/recommendations', async (req, res)=> {
    try {
        let id = req.body.id;        
        res.json(await moviesController.searchByGenre(id));
    } catch (err) {
        return res.status(500).json({
            mensaje: err.message
        });
    }
});


//Encuentra videos sobre una película
router.post('/video', async (req, res)=> {
    try {
        let id = req.body.id;
        res.json(await moviesController.searchVideo(movieGenre));
    } catch (err) {
        return res.status(500).json({
            mensaje: err.message
        });
    }
});



// PUSH - CREATE A NEW ORDER
router.post("/new", authenticate, async (req,res) =>{
    try{
        let body = req.body;
        console.log(body);
        res.json(await moviesController.newMovie(body));
    }catch (err){
        return res.status(500).json({
            message: err.message
        });
    }
});



router.post("/play", authenticate, async (req,res) =>{
    try{
        let body = req.body;
        console.log(body);
        res.json(await moviesController.playMovie(body));
    }catch (err){
        return res.status(500).json({
            message: err.message
        });
    }
});

router.post("/buy", authenticate, async (req,res) =>{
    try{
        let body = req.body;
        console.log("Entro al controlador de buy");
        res.json(await moviesController.buyMovie(body));
    }catch (err){
        return res.status(500).json({
            message: err.message
        });
    }
});

router.post("/rent", authenticate, async (req,res) =>{
    try{
        let body = req.body;
        console.log(body);
        res.json(await moviesController.rentMovie(body));
    }catch (err){
        return res.status(500).json({
            message: err.message
        });
    }
});


module.exports = router;