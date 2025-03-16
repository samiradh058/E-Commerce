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

// Add new Admin
export const addAdmin = async (formData: { [key: string]: string }) => {
  try {
    const response = await fetch("http://localhost:8080/add_admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      return { success: false, error: data.message || "Failed to add admin" };
    }
    return { success: true, data };
  } catch (error) {
    console.error("Error occurred during adding admin", error);
  }
};

// Fetch Users
export const fetchUsers = async () => {
  try {
    const response = await fetch("http://localhost:8080/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      return { success: false, error: data.message || "Failed to fetch users" };
    }
    return { success: true, data: data.users };
  } catch (error) {
    console.error("Error occurred during fetching users", error);
  }
};

// Forgot Password
export const forgotPassword = async (formData: { [key: string]: string }) => {
  try {
    const res = await fetch("http://localhost:8080/forgot-password", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    console.log("res is ", res);

    if (res.status === 500) {
      return { success: false, error: "Internal Server Error" };
    }
    if (res.status === 200) {
      return { success: true };
    }
    return { success: false, error: "Unexpected response from the server" };
  } catch (error) {
    console.error("Error occurred during forgot password", error);
    return { success: false, error: "Unexpected error occured" };
  }
};

// Reset Password
export const resetPassword = async (
  token: string,
  newPassword: string,
  confirmPassword: string
) => {
  if (newPassword !== confirmPassword) {
    return { success: false, message: "Passwords do not match." };
  }

  try {
    const res = await fetch(`http://localhost:8080/reset-password/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newPassword }),
    });

    const data = await res.json();

    if (res.status === 500) {
      return {
        success: false,
        message: data.message || "Something went wrong.",
      };
    }

    return {
      success: true,
      message: "Your password has been reset successfully.",
    };
  } catch (error) {
    console.error("Error resetting password:", error);
    return { success: false, message: "Unexpected error occurred." };
  }
};
