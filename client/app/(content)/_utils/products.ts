export async function getProducts() {
  try {
    const res = await fetch("http://localhost:8080/products", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    return res.json();
  } catch (error) {
    console.log("Error fetching products ", error);
    return [];
  }
}

export async function getProductFromId(productId: string) {
  try {
    console.log("product id from utils is ", productId);
    const res = await fetch(`http://localhost:8080/products/${productId}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    return res.json();
  } catch (error) {
    console.log("Error fetching product individual product from id ", error);
    return [];
  }
}
