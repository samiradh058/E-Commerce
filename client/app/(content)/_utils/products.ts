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

    if (!response.ok) {
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

    const data = await res.json();

    if (res.ok) {
      const { updatedQuantity } = await data;

      return updatedQuantity;
    } else {
      alert("Failed to update quantity! " + data.message);
    }
  } catch (error) {
    console.error("Error updating quantity", error);
  }
}

// Add product
export async function addProduct(formData: {
  [key: string]: string | number | object;
}) {
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

// Delete product
export async function deleteProduct(productId: string) {
  try {
    const response = await fetch(`http://localhost:8080/delete_product`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Failed to delete product",
      };
    }
    return { success: true, product: data.product };
  } catch (error) {
    console.error("Error deleting product", error);
    return { success: false, error: "Error deleting product" };
  }
}

// Update product
export async function updateProduct(
  productId: string,
  updatedProduct: {
    [key: string]: string | number | { question: string; answer: string }[];
  }
) {
  try {
    const response = await fetch(
      `http://localhost:8080/update_product/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
        credentials: "include",
      }
    );

    const data = await response.json();

    if (response.ok) {
      return { success: true, data: data.product };
    } else {
      return { success: false, error: "Error updating product" };
    }
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: "Error updating product" };
  }
}

// Get the details of specific item in cart based on product id and user id
export async function getCartItemDetails(productId: string, userId: string) {
  try {
    const response = await fetch(
      `http://localhost:8080/cart/${userId}/${productId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (response.status !== 200) {
      const errorData = await response.json();
      return { success: false, error: errorData.message || "Unauthorized" };
    }
    const data = await response.json();

    const cartItem = data.cartItem;
    const cartProductPrice = data.cartProductPrice;

    if (!cartItem || cartProductPrice === undefined) {
      return { success: false, error: "Missing cart item or product price" };
    }

    return { success: true, data: { cartItem, cartProductPrice } };
  } catch (error) {
    console.error("Error fetching cart item details", error);
    return { success: false, error: "Error fetching cart item details" };
  }
}

// Fetch order items for the user
export async function fetchOrderItems() {
  try {
    const response = await fetch("http://localhost:8080/orders", {
      method: "GET",
      credentials: "include",
    });

    if (response.status === 401) {
      return { error: "unauthorized" };
    }

    const data = await response.json();

    if (!response.ok) {
      return { message: data.message };
    }

    return { data };
  } catch (error) {
    console.error("Error fetching order items", error);
    return { error: "fetch_failed" };
  }
}

// Fetch all ordered items
export async function fetchAllOrderItems() {
  try {
    const response = await fetch("http://localhost:8080/allOrders", {
      method: "GET",
      credentials: "include",
    });

    console.log("response is ", response);

    if (response.status === 401) {
      return { error: "Error fetching ordered items" };
    }

    const data = await response.json();

    if (!response.ok) {
      return { message: data.message };
    }
    return { data };
  } catch (error) {
    console.error("Error fetching all ordered items", error);
    return { error: "fetch_failed" };
  }
}

// Change received status in order
export async function changeReceivedStatus({
  transactionId,
  receivedStatus,
}: {
  transactionId: string;
  receivedStatus: boolean;
}) {
  try {
    const response = await fetch("http://localhost:8080/update-order-status", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transactionId, receivedStatus }),
      credentials: "include",
    });

    console.log("response is ", response);
    if (!response.ok) {
      throw new Error("Failed to change received status");
    }
  } catch (error) {
    console.error("Error changing received status", error);
    return { error: "Failed to change received status" };
  }
}

// Buy product (Khalti Payment Gateway)
export async function buyProduct(productData: {
  userId: string;
  productId: string;
  total: number;
  name: string;
  email: string;
  address: string;
  phone: string;
}) {
  try {
    const response = await fetch("http://localhost:8080/cart/buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
      credentials: "include",
    });

    const data = await response.json();

    if (data.success) {
      window.location.href = data.payment_url;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("Error buying product", error);
    return { success: false, error: "Error buying product" };
  }
}

// Verify payment
export async function verifyPayment(
  searchParams: URLSearchParams
): Promise<void> {
  try {
    const response = await fetch("http://localhost:8080/cart/verify-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(searchParams.entries())),
      credentials: "include",
    });

    const data: {
      success: boolean;
      message: string;
    } = await response.json();

    if (data.success) {
      alert(data.message + " Your order is confirmed.");
    } else {
      alert("Payment verification failed: " + data.message);
    }
  } catch (error) {
    alert("An error occurred while verifying payment." + error);
  } finally {
    window.location.href = "/cart-order";
  }
}
