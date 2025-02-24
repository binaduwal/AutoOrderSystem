const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connection = require('./database/db')
const permission = require('./routes/permissionRoutes') 
const authRoute=require('./routes/authRoutes')
const Login=require('./routes/loginTest')
const role = require('./routes/rolesRoute')

dotenv.config()
const app = express()
app.use(express.json()) 

connection() 
app.use(cors({
  origin: "http://localhost:5173",  
  methods: ["GET", "POST","DELETE","PUT"]
}))

app.use('/', Login)
app.use('/auth',authRoute)

app.use('/permission', permission) 
app.use('/role',role)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
