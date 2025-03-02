export const checkLoggedIn = async () => {
  try {
    const res = await fetch("http://localhost:8080/session", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error checking login status", error);
  }
};

export const signupUser = async (formData: { [key: string]: string }) => {
  try {
    const response = await fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    return {
      success: false,
      error: "Signup failed, please try again." + error,
    };
  }
};

export const loginUser = async (formData: { [key: string]: string }) => {
  try {
    console.log("Login user triggered");
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });
    const data = await response.json();
    console.log("data after login", data);
    if (!response.ok) {
      return { success: false, error: data.message || "Login failed" };
    }
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: "Login failed, please try again." + error,
    };
  }
};

// Logout
export const handleLogout = async () => {
  try {
    const res = await fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 500) {
      return { success: false, error: "Logout failed" };
    }
    if (res.status === 200) {
      return { success: true };
    }
    return { success: false, error: "Unexpected response from the server" };
  } catch (error) {
    console.error("Error occurred during logout", error);
    return { success: false, error: "Network error during logout" };
  }
};
