const categories = [
    { title: "Invitation Card", items: ["Baby shower", "Barsi Card", "Bhagwat", "Birthday Card", "Griha pravesh", "Namkaran", "Opening", "Wedding card", "Festival"] },
    { title: "Template", items: ["Poster", "Business Card", "Menu Card", "Certificate", "Screen Offset"] },
    { title: "ID Card", items: ["Company", "Employee", "Student"] },
    { title: "Banner", items: ["Shop Banner", "Festival Banner"] },
    { title: "Invoice", items: ["Bill Book", "Letter Head", "Rasid Book"] },
  ];
  
  export const normalizeString = (str) => {
    return str.toLowerCase().replace(/-/g, ' ').trim();
  };
  
  const filterCategory = (categoryName, itemName) => {
  
    if (!categoryName || !itemName) return false;
  
    
    const normalizedCategoryName = normalizeString(categoryName);
    const normalizedItemName = normalizeString(itemName);
  
    
    const category = categories.find(
      (cat) => normalizeString(cat.title) === normalizedCategoryName
    );
  

    const itemExists = category?.items.some(
      (item) => normalizeString(item) === normalizedItemName
    );
  
    if(itemExists && category){
        return true;
    }

    return false;
  };
  
  export default filterCategory;
  