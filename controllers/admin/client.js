import Product from "../../models/admin/Product.js";
import ProductStat from "../../models/admin/ProductStat.js";
import User from "../../models/admin/User.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );
    // const productsWithStats = await Product.aggregate([
    //   {
    //     $lookup: {
    //       from: "productstats",  // Collection name in lowercase and plural
    //       localField: "_id",
    //       foreignField: "productId",
    //       as: "stat"
    //     }
    //   }
    // ]);
    res.set('Cache-Control', 'no-store');   //Probably temp. Says browser to not store cache
    res.status(200).json(productsWithStats);
  } catch(error) {
    res.status(404).json({message: error.message});   //don't do this in real world app.
  }

};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {

};

export const getGeography = async (req, res) => {

};
