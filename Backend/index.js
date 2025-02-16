const express=require('express')
const dotenv = require('dotenv');
const cors = require("cors");
const connection=require('./database/db')
const Login=require('./routes/loginTest')
const authRoute=require('./routes/signUp')

dotenv.config();
const app=express()
app.use(express.json()); 

connection()

app.use(cors({
    origin: "http://localhost:5173",  
    methods: ["GET", "POST"]
}));

app.use('/', Login);
app.use('/auth',authRoute)

const port=process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})