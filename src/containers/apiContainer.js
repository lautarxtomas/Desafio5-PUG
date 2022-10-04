class ApiContainer{
    constructor(products) {
        this.products = products
    }

    // METHODS
    getById = (id) => {
        return this.products.find(product => product.id == id)
    }
    
    addProduct = (req, res) => {
        const product = req.body
        product.id = (this.products.length + 1)
        this.products.push(product)
        res.json(product)
    }
    
    getProduct = (req, res) => {
        const { id } = req.params
        this.getById(id) != null ? res.send({ product: this.getById(id) }) : res.send({ error: "Product not found" })
    }
    
    modifyProduct = (req, res) => {
        const { id } = req.params
        const product = req.body
        product.id = id
        this.products.splice(parseInt(id - 1), 1, product)
        res.send({ modifiedProduct: product })
    }
    
    deleteProduct = (req, res) => {
        const { id } = req.params
        const product = this.products.splice(parseInt(id - 1), 1)
        res.send({ deletedProduct: product })
    }
}

module.exports = ApiContainer // --> exporto clase constructora e importo en server.js