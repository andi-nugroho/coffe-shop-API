import express from "express";
import { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct } from "../controller/productControllers.js";

const Router = express.Router();

Router.post('/tambah_produk', createProduct)
Router.get('/produk', getAllProducts);
Router.get('/produk/:id', getProductById)
Router.put("/produk/:id", updateProduct)
Router.delete("/produk/:id", deleteProduct)

export default Router;
