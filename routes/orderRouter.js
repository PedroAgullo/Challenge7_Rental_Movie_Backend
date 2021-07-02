const router = require("express").Router();
const orderController = require("../controllers/orderController.js");
const authenticate = require('../middleware/authenticate.js');
const admin = require ('../middleware/admin.js');

// CRUD


//GET - ID ORDER - NO ADMIN
router.get('/city', admin, async (req, res) => {
    try {
        // let city = req.body.city;
        res.json(await orderController.allCities());

   }catch (err) {
       return res.status(500).json({
           message: err.message
       });
   }
});


//Trae los pedidos de 1 usuario.
router.post('/user', authenticate, async (req, res) => {
    try {
        let body = req.body;
        console.log("Datos del body: ", body);
        res.json(await orderController.orderUser(body));

   }catch (err) {
       return res.status(500).json({
           message: err.message
       });
   }
});



//GET - ALL ORDERS - ADMIN
router.post('/all', admin, async (req, res) => {
     try {
         console.log(req.body);
        res.json(await orderController.allOrders());

    }catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

//Get - ALL ORDERS - BY TYPE
router.post('/type', admin, async (req, res) => {
    try {
        console.log(req.body);
       res.json(await orderController.orderType(req.body));

   }catch (err) {
       return res.status(500).json({
           message: err.message
       });
   }
});


//Find order by ID
router.post('/id', admin, async (req, res)=> {             
    try {
        console.log(req.body.id)
        let body = req.body;
        res.json(await orderController.orderId(req.body.id));
        
    } catch (err) {
        return res.status(500).json({
            mensaje: err.message
        });
    }
});

//Delete order
router.post('/delete', admin, async (req, res)=> {             
    try {
        console.log(req.body.id)
        let body = req.body;
        res.json(await orderController.deleteOrder(req.body.id));
        
    } catch (err) {
        return res.status(500).json({
            mensaje: err.message
        });
    }
});


// PUSH - CREATE A NEW ORDER
router.post("/", authenticate, async (req,res) =>{
    try{
        let body = req.body;
        console.log(body);
        res.json(await orderController.newOrder(body));
    }catch (err){
        return res.status(500).json({
            message: err.message
        });
    }
});



module.exports = router;