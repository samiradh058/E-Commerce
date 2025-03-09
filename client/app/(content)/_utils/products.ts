// Get All Products
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

// Fetch product based on Id
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

// Fetch cart items
export async function fetchCartItems() {
  try {
    const response = await fetch("http://localhost:8080/cart", {
      method: "GET",
      credentials: "include",
    });

    if (response.status === 401) {
      return { error: "unauthorized" };
    }

    const data = await response.json();

    if (data.message === "Admin donot have a cart") {
      return data.message;
    }

    return { data };
  } catch (error) {
    console.error("Error fetching cart items", error);
    return { error: "fetch_failed" };
  }
}

// Delete cart item
export async function deleteCartItem(productId: string) {
  try {
    const res = await fetch("http://localhost:8080/cart/delete", {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });
    return res.ok;
  } catch (error) {
    console.error("Error deleting item", error);
  }
}

// Change Quantity
export async function updateQuantity(
  productId: string,
  action: "increase" | "decrease"
) {
  try {
    const res = await fetch("http://localhost:8080/cart/update", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, action }),
    });

    if (res.ok) {
      const { updatedQuantity } = await res.json();

      return updatedQuantity;
    } else {
      console.error("Error updating quantity");
    }
  } catch (error) {
    console.error("Error updating quantity", error);
  }
}

// Add product
export async function addProduct(formData: { [key: string]: string | number }) {
  try {
    const response = await fetch("http://localhost:8080/add_product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      return { success: false, error: data.message || "Failed to add product" };
    }
    return { success: true, product: data.product };
  } catch (error) {
    console.error("Error adding product", error);
    return { success: false, error: "Error adding product" };
  }
}
