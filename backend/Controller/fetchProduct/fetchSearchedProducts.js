const Product = require("../../modals/product"); // Assuming Product schema is defined

const fetchSearchProducts = async (req, res) => {
  try {
    const { search, page = 1, limit = 12 } = req.body;

    // Define query object using $or for matching any of the fields
    const query = {
      $or: [
        { category: new RegExp(search, "i") }, // case-insensitive match for category
        { item: new RegExp(search, "i") }, // case-insensitive match for item
        { title: new RegExp(search, "i") }, // case-insensitive match for title
      ],
    };

    // Pagination calculation
    const skip = (page - 1) * limit;

    // Fetch the paginated results
    const products = await Product.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .select(["-cdrFile","-purchaseCount"]);

    if (!products.length) {
      return res.status(200).json({ success: false, message: "No Products Found",products:null });
    }

    // Get the total count of matching documents
    const total = await Product.countDocuments(query);

    
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

module.exports = fetchSearchProducts;
