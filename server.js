const express = require('express')
const { Router } = express
const routerProducts = Router()
const apiContainer = require ('./src/containers/apiContainer') // import de clase constructora
const app = express()


app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use('/api/products', routerProducts)
app.use(express.static('public'))


const products = []
let api = new apiContainer(products)

routerProducts.get('/', (req, res) => {
    res.render('products', { products })
})

routerProducts.post('/', (req, res) => {
    api.addProduct(req, res);
})

routerProducts.get('/:id', (req, res) => {
    api.getProduct(req, res);
})

routerProducts.put('/:id', (req, res) => {
    api.modifyProduct(req, res);
})

routerProducts.delete('/:id', (req, res) => {
    api.deleteProduct(req, res);
})


// Running server
const PORT = process.env.port || 8080

const server = app.listen(PORT, () => {
    console.log(`HTTP Server running on port ${server.address().port}`)
})

server.on("error", error => console.log(`Error on server ${error}`))