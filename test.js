const express = require("express")
const app = express()
const PORT = 3000

const products = [
    {
        id: 1,
        name: "iPhone",
        price: 39999,
        category: "electronics",
    },
    {
        id: 2,
        name: "Laptop",
        price: 55000,
        category: "electronics",
    },
    {
        id: 3,
        name: "Desk",
        price: 8000,
        category: "furniture",
    },
    {
        id: 4,
        name: "Chair",
        price: 4500,
        category: "furniture",
    },
    {
        id: 5,
        name: "Headphones",
        price: 5000,
        category: "electronics",
    },
]

app.get("/products", (req, res) => {
    const{take, category} = req.query
    let result = [...products]
    if (category) {
    result = result.filter((product) => product.category === category)
  }

  if (take !== undefined) {
    const limit = Number(take)
    if (!Number.isNaN(limit)) {
      result = result.slice(0, limit);
    }
  }
  res.status(200).json(result);
})

app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id)
  const product = products.find((product) => product.id === id)
  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    })
  }
  res.status(200).json(product)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})