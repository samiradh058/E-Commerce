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
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });
    const data = await response.json();
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
