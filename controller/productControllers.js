import Products from "../models/product.js";
import fs from "fs/promises";
import { promisify } from "util";
import multer from "multer";
import path from "path";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Products.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Gagal menampilkan produk"});
  }
}

export const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    // const imageUrl = req.file ? req.file.filename : null;
    const product = await Products.create({ 
      name: name, 
      description: description, 
      price: price 
    })
    res.status(201).json({ message: "Produk berhasil ditambahkan", product: product})
  } catch (error) {
    console.error("Gagal menambah produk:", error);
    res.status(500).json({ error: "Internal Server Error"})
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const productId = await Products.findByPk(id);

    if(!productId){
      return res.status(404).json({ error: "Produk tidak ditemukan"});
    }

    res.status(200).json(productId)
  } catch (error) {
    console.error("Gagal menampilkan produk by ID:", error);
    res.status(500).json({ error: "Internal Server Error"})
  }
}

// const unlinkAsync = promisify(fs.unlink);

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    // let imageUrl = null;

    // if(req.file){
    //   imageUrl = req.file.filename

    //   const existingImg = await Products.findByPk(id);
    //   if(existingImg && existingImg.imageUrl){
    //     const oldImageUrl = path.join(__dirname, "..", existingImg.imageUrl);
    //     await unlinkAsync(oldImageUrl)
    //   }
    // }

    const updateItem = await Products.update({ name: name, description: description, price: price},
    { where: { id: id }}
    );

    if(!updateItem[0]){
      return res.status(404).json({ error: "Produk tidak ditemukan"});
    }
    res.status(200).json({ message: "Produk berhasil di update"})
  } catch (error) {
    console.error("Gagal update Produk", error);
    res.status(500).json({ error: "Internal Server Error"})
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const productDelete = await Products.destroy({ where: {id: id }})
    if(!productDelete){
      return res.status(404).json({ error: "Produk tidak ditemukan"});
    }
    res.status(200).json({ message: "Produk berhasil dihapus"})
  } catch (error) {
      console.error("Gagal hapus produk:", error)
      res.status(500).json({ error: "Internal Server Error"});
  }
}
