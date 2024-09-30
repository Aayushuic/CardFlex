const mongoose = require('mongoose');
const Product = require('../backend/modals/product'); // Adjust the path as needed

const categories = [
  { title: "Invitation Card", items: ["Baby shower", "Barsi Card", "Bhagwat", "Birthday Card", "Griha pravesh", "Namkaran", "Opening", "Wedding card", "Festival"] },
  { title: "Template", items: ["Poster", "Business Card", "Menu Card", "Certificate", "Screen Offset"] },
  { title: "ID Card", items: ["Company", "Employee", "Student"] },
  { title: "Banner", items: ["Shop Banner", "Festival Banner"] },
  { title: "Invoice", items: ["Bill Book", "Letter Head", "Rasid Book"] }
];

// Function to generate the specific "Invoice - Bill Book" product
const generateSpecificProduct = () => {
  const oldPrice = 210;
  const newPrice = 48;

  return {
    title: `Invoice - Bill Book`,
    description: `A detailed description of Bill Book under Invoice.`,
    oldPrice: oldPrice,
    newPrice: newPrice,
    category: "Invoice",
    item: "Bill Book",
    imageUrl: "https://myshadicards.com/wp-content/uploads/2021/10/Hindu-Wedding-Cards-My-Shadi-Cards.webp",
    cdrFile: "https://drive.google.com/file/d/1HkckCL6nuQWA6HPC5vawli3KC0lX-IdB/view?pli=1"
  };
};

// Function to generate random products
const generateRandomProduct = () => {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const item = category.items[Math.floor(Math.random() * category.items.length)];
  const randomPrice = Math.floor(Math.random() * 300) + 100; // Random price between 100 and 400
  const discount = Math.floor(Math.random() * 80); // Random discount up to 80
  const oldPrice = randomPrice;
  const newPrice = randomPrice - discount;

  return {
    title: `${category.title} - ${item}`,
    description: `A detailed description of ${item} under ${category.title}.`,
    oldPrice: oldPrice,
    newPrice: newPrice,
    category: category.title,
    item: item,
    imageUrl: "https://media.istockphoto.com/id/1748707366/vector/watercolor-boho-wedding-invitation-template-vector-design-illustration.jpg?s=1024x1024&w=is&k=20&c=mAY5_UX3w2H5hcLPiazuhJ5r35EQSytuQXL5IEGdI70=",
    cdrFile: `${item.toLowerCase().replace(/\s+/g, '-')}.cdr`
  };
};

// Function to generate the required number of products
const generateProducts = (count, specificCount) => {
  const products = [];

  // Generate the specific products first
  for (let i = 0; i < specificCount; i++) {
    products.push(generateSpecificProduct());
  }

  // Generate the remaining random products
  for (let i = 0; i < count - specificCount; i++) {
    products.push(generateRandomProduct());
  }

  return products;
};

const main = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/flexcard');
    
    console.log('Connected to MongoDB');

    // Generate and save products (1 specific product + 20 random products for total 21)
    const products = generateProducts(21, 1); // 1 Invoice/Bill Book and 20 random ones
    const pr = await Product.insertMany(products);
    console.log(pr);

    console.log('Products saved to database');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the main function
main();
