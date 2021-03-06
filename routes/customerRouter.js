const router = require("express").Router();
const customerController = require("../controllers/customerController.js");
const authenticate = require('../middleware/authenticate.js');
const admin = require('../middleware/admin.js');
const checkMail = require('../middleware/checkMail.js');


//CRUD CUSTOMER
//Get All customers.
router.get('/', admin, async (req, res) => {
    try {
        res.json(await customerController.allCustomer());
    }catch (err) {
        return res.status(500).json({
        message: err.message
        });
    }
});

//Find customer by ID
router.post('/id', admin, async (req, res)=> {             
    try {
        let id = req.body.customerId;
        res.json(await customerController.customerId(id));
        
    } catch (err) {
        return res.status(500).json({
            mensaje: err.message
        });
    }
});

//Find customer by email
router.post('/email', admin, async (req, res)=> {             
    try {

        let email = req.body.email;
        res.json(await customerController.mailCustomer(email));
        
    } catch (err) {
        return res.status(500).json({
            mensaje: err.message
        });
    }
});



//Find customer by dni
router.post('/dni', admin, async (req, res)=> {             
    try {
        let dni = req.body.dni;
        res.json(await customerController.dniCustomer(dni));
        
    } catch (err) {
        return res.status(500).json({
            mensaje: err.message
        });
    }
});






//Find customer by name
router.post('/name', authenticate, async (req, res)=> {          
    try {
        let name = req.body.name;
        res.json(await customerController.nameCustomer(name));
        
    } catch (err) {
        return res.status(500).json({
            mensaje: err.message
        });
    }
});

//Add a new Customer
router.post('/', checkMail, async (req, res)=> {
    try {
        const body = req.body;
        res.json(await customerController.newCustomer(body));
        
    } catch (err) {
        return res.status(500).json({
            mensaje: err.message
        });
    }
});


//Modify a customer
router.post('/update', authenticate, async (req, res)=> {
    try {
        let attributes = req.body;
        res.json(await customerController.modifyCustomer(attributes));
        
    } catch (err) {
        return res.status(500).json({
            mensaje: err.message
        });
    }
});

//MOdifica el atributo infantil del usuario
router.post('/infantil', authenticate, async (req, res)=> {
    try {
        let attributes = req.body;
        res.json(await customerController.modifyInfantil(attributes));
        
    } catch (err) {
        return res.status(500).json({
            mensaje: err.message
        });
    }
});

//MOdifica el atributo premium del usuario
router.post('/premium', authenticate, async (req, res)=> {
    try {
        let attributes = req.body;
        res.json(await customerController.modifyPremium(attributes));
        
    } catch (err) {
        return res.status(500).json({
            mensaje: err.message
        });
    }
});

//Delete a customer
router.post('/modify', admin, async (req, res) =>{
    try {
        
        
        res.json(await customerController.modifyCustomer(req.body));
        
    }catch (err) {
        return res.status(500).json({
            message: err.message
        }); 
    }
});



router.get("/confirm/:confirmationCode", async (req, res) => {
    try {
      token = req.params.confirmationCode;
      res.json(await customerController.updateActive(token));
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  });

module.exports = router;