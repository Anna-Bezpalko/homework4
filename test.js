const express = require("express")
const app = express() 
const PORT = 3000
app.use(express.json())
const products = [ { id: 1, name: "iPhone 16", price: 39999, category: "electronics", image: "" }, { id: 2, name: "Laptop", price: 55000, category: "electronics", image: "" }, { id: 3, name: "Desk", price: 8000, category: "furniture", image: "" }, { id: 4, name: "Chair", price: 4500, category: "furniture", image: "" }, { id: 5, name: "Headphones", price: 5000, category: "electronics", image: "" }, ]
app.get("/products", (req, res) => { const { take, category } = req.query
let result = [...products]
if (category) { result = result.filter((product) => product.category === category) }
if (take !== undefined) { const limit = Number(take)
if (!Number.isNaN(limit)) {
  result = result.slice(0, limit)
}
}
res.status(200).json(result) })
app.get("/products/:id", (req, res) => { const id = Number(req.params.id)
const product = products.find((product) => product.id === id)
if (!product) { return res.status(404).json({ message: "Product not found" }) }
res.status(200).json(product) })
function addProduct(newProduct, shouldFail = false) { return new Promise((resolve, reject) => { if (shouldFail) { return reject(new Error("Failed to save product")) }
products.push(newProduct)
resolve(newProduct)
}) }
app.post("/products", async (req, res) => { const { name, price, category, image = "" } = req.body
if ( typeof name !== "string" || name.trim() === "" || typeof price !== "number" || price <= 0 || typeof category !== "string" || category.trim() === "" ) { return res.status(422).json({ message: "Invalid product data" }) }
const duplicate = products.some( (product) => product.name.toLowerCase() === name.trim().toLowerCase() )
if (duplicate) { return res.status(409).json({ message: "Conflict" }) }
const newProduct = { id: products.length + 1, name: name.trim(), price, category: category.trim(), image, }
try { const shouldFail = req.query.fail === "true"
const product = await addProduct(newProduct, shouldFail)

res.status(201).json(product)
} catch (error) { res.status(500).json({ message: "Failed to save product" }) } })
app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) })