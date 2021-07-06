const express = require('express');
const app = express();
const port = process.env.PORT ||3005;
const router = require('./router');
const db = require('./db.js');
const cors = require('cors');


//Middleware
app.use(cors())
app.use(express.json());  //Importante la prioridad a la hora de declararlo.
app.use(router);



//Connecting to the database
db.then(()=>{
    //Starting server
        app.listen(port, ()=> console.log(`Node server running on http://localhost:${port}`));
    })
    .catch((err)=> console.log(err.message));   