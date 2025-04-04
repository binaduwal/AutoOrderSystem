const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connection = require('./database/db')
const permission = require('./routes/permissionRoutes') 
// const authRoute=require('./routes/authRoutes')
// const Login=require('./routes/loginTest')
const role = require('./routes/rolesRoute')
const adminCreateUser=require('./routes/adminCreateUser')
const company=require('./routes/companyRoute')
const location=require('./routes/locationRoute')
const province=require('./routes/provinceRoute')
const city=require('./routes/cityRoutes')
const category=require('./routes/categoryRoute')
const ProductCategory=require('./routes/productCategory')
const ProductUnit = require('./routes/productUnit')
const path = require('path')
const paymentMode=require('./routes/paymentModeRoutes')
const route=require('./routes/routeRoutes')
const PartyGroup = require('./routes/partyGroupModelRoutes')
const Salesperson = require('./routes/salesPersonRoutes')
const Party=require('./routes/partyRoutes')
const Order=require('./routes/orderRoutes')

dotenv.config()
const app = express()
app.use(express.json()) 

connection() 
app.use(cors({
  origin: "http://localhost:5173",  
  methods: ["GET", "POST","DELETE","PUT"]
}))

// app.use('/', Login)
// app.use('/auth',authRoute)

app.use('/permission', permission) 
app.use('/role',role)
app.use('/admin',adminCreateUser)
app.use('/company',company)
app.use('/location',location)
app.use('/province',province)
app.use('/city',city)
app.use('/category',category)
app.use('/product',ProductCategory)
app.use('/unit',ProductUnit)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/paymentmode',paymentMode)
app.use('/route',route)
app.use('/partygroup',PartyGroup)
app.use('/salesperson',Salesperson)
app.use('/party',Party)
app.use('/order',Order)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
