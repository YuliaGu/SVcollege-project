const experss= require('express')
const bp = require('body-parser')
const db = require('mongoose')

const app = experss()

app.use(experss.static('client'))
app.use(bp.json())

db.connect('mongodb+srv://yuliaG:yuls2468@cluster0.rzjx7tq.mongodb.net/SVShop')

const userSchema = db.Schema({
    name: String,
    email: String,
    password: String
})
const usersModel = db.model('users', userSchema)

const productSchema = db.Schema({
    name: String,
    price: Number
})
const productsListModel = db.model('productsLists', productSchema)

const orderSchema = db.Schema({
    email: String,
    productsList: Array
})
const pendingOrdersModel = db.model('pendingOrders', orderSchema)

const allMadeOrdersModel = db.model('allMadeOrders', orderSchema)

const updatedOrderModel = db.model('updatedOrder', orderSchema)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/homePage.html')
})

app.get('/signUp', (req, res) => {
    res.sendFile(__dirname+ '/client/signUp.html')
})

app.get('/productsList', (req, res) => {
    res.sendFile(__dirname + '/client/productsList.html')
})

app.get('/getProductsList', async(req, res) => {
    try{
        let productsList = await productsListModel.find()
        res.json(productsList)
    }
    catch{
        throw new Error('error')
    }
})

app.get('/buy', (req, res) => {
    res.sendFile(__dirname + '/client/buy.html')
})

app.get('/buySummery', (req, res) => {
    res.sendFile(__dirname + '/client/buy.html')
})

app.get('/pendingOreders', (req, res) => {
    res.sendFile(__dirname + '/client/pendingOrders.html')
})

app.post('/productsList', async(req, res) => {
    let email = req.body.email
    let password = req.body.password

    try{
        let foundUser = await usersModel.find({email: email})
        let foundOrder = await pendingOrdersModel.find({email: email})

        if(foundUser.length == 0){
            res.json({'message': 'User does not exists, please sign up'})
        }
        else if(foundUser.length == 1 && foundUser[0].password !== password){
            res.json({'message': 'Incorrect password, try again'})
        }
        else if(foundUser.length == 1 && foundUser[0].password == password /*&& foundOrder.length == 0*/){
            res.json({'message': 'User found'})
        }
        //does work 100%..
        // else if(foundUser.length == 1 && foundUser[0].password == password && foundOrder.length != 0){
        //     // res.json(foundOrder)
        //     res.json({'message': 'User has a pending order'})
        // }
    }
    catch{
        throw new Error('error')
    }
})

app.post('/signUp', async(req, res) => {
    let name = req.body.name
    let email = req.body.email
    let password = req.body.password
    let newUser = {
        name,
        email,
        password
    }

    try{
        let foundUser = await usersModel.find({email: email})
        if(foundUser.length == 0){
            await usersModel.insertMany(newUser)
            res.json({message: 'New user added'})
        }
        else if(foundUser.length == 1){
            res.json({message: 'Email already exists'})
        }
    }
    catch{
        throw new Error('error')
    }
})

app.post('/buy', async(req, res) => {
    // console.log(req.body)  i have an issue that there is made a req with an empty body
    let email = req.body.email
    let productsList = req.body.productsList
    let newOrder = {
        email,
        productsList
    }

    try{
        if(Object.keys(req.body).length !== 0){ //avoide inserting the empty body req
            await pendingOrdersModel.insertMany(newOrder)
            res.json({message: 'Order submited'})
        }
    }
    catch{
        throw new Error('error')
    }
})

app.post('/buySummery', async(req, res) => {
    let email = req.body.email

    try{
        // let userOrder = await pendingOrdersModel.findOne({email: email})
        let userOrders = await pendingOrdersModel.find({email: email})
        let lestOrder = userOrders[userOrders.length - 1]
        res.json(lestOrder)
    }
    catch{
        throw new Error('error')
    }
})

app.post('/disconnect', async(req, res) => {
    let email = req.body.email

    try{
        let order = pendingOrdersModel.findOne({email: email})
        if(Object.keys(req.body).length !== 0){ //avoide inserting the empty body req
            await allMadeOrdersModel.insertMany(order) 
        }
        await pendingOrdersModel.deleteOne({email: email})
        res.json({message: 'Order removed from pending'})
    }
    catch{
        throw new Error('error')
    }
})

app.post('/getUserInfo', async(req, res) => {
    let email = req.body.email

    try{
        let foundUser = await usersModel.findOne({email: email})
        res.json(foundUser)
    }
    catch{
        throw new Error('error')
    }
})

app.post('/pendingOrders', async(req, res) => {
    let email = req.body.email

    try{
        let userOrders = await pendingOrdersModel.find({email: email})
        res.json(userOrders)
    }
    catch{
        throw new Error('error')
    }
})

app.post('/removePendingOrder', async(req, res) => {
    let email = req.body.email

    try{
        await pendingOrdersModel.deleteOne({email: email})
        res.json({message: 'Order removed from pending'})
    }
    catch{
        throw new Error('error')
    }
})

app.get('/allMadeOrders', async(req, res) => {
    try{
        let allMadeOrders = await allMadeOrdersModel.find()
        res.json(allMadeOrders)
        res.json({message: "All orders"})
    }
    catch{
        throw new Error('error')
    }
})

// app.post('/updatedOrder', async(req, res) => {
//     let email = req.body.email
//     let productsList = req.body.productsList
//     let updatedOrder = {
//         email,
//         productsList
//     }

//     try{
//         await updatedOrderModel.insertMany(updatedOrder)
//         res.json({message: "Updated order"})
//     }
//     catch{
//         throw new Error('error')
//     }
// })

// app.post('/getUpdatedOrder', async(req, res) => {
//     let email = req.body.email

//     try{
//         let updatedOrder = await updatedOrderModel.findOne({email: email})
//         res.json(updatedOrder)
//     }
//     catch{
//         throw new Error('error')
//     }
// })

app.use(adminPermission)

app.get('/all', (req, res) => {
    res.sendFile(__dirname + '/client/allOrders.html')
})

function adminPermission(req, res, next){
    if(req.query.admin == 'true') next()
    else res.status(400).json({message: "Error"})
}

app.listen('4000', () => {console.log('Listenning')})