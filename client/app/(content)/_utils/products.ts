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
