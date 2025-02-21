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
