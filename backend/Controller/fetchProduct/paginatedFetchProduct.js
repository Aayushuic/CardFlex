const Product = require("../../modals/product"); // Assuming Product schema is defined

const paginateFetchProduct = async (req, res) => {
  try {
    const { categoryName, itemName, page = 1, limit = 12 } = req.body;
    

    // Define query object based on filters
    const query = {
      category: new RegExp(`^${categoryName}$`, "i"), // case-insensitive exact match for category
      item: new RegExp(`^${itemName}$`, "i"), // case-insensitive exact match for item
    };

    // Pagination calculation
    const skip = (page - 1) * limit;

    // Fetch the paginated results
    const products = await Product.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .select("-cdrFile");

      if(!products){
        return res.status(200).json({success:false,message:"No Product Found"})
      }

    // Get the total count of matching documents
    const total = await Product.countDocuments(query);
    console.log(total)
    
    res.json({
      success: true,
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      totalProducts: total,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = paginateFetchProduct;
