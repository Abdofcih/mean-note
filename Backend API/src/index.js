const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user')
const noteRout = require('./routers/note')


const app = express();
const port = process.env.PORT;
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
  });
app.use(express.json())
app.use(userRouter)
app.use(noteRout)


app.listen(port, ()=>{
    console.log("server up running on port " + port);
    
})