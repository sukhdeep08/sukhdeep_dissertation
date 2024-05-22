export async function fetchProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=48");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function fetchProductsSearch(item) {
  try {
    const res = await fetch(`https://dummyjson.com/products/search?q=${item}`);
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function fetchProductID(id) {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in fetching data");
  }
}
