export const loginAdmin = async (formData: { [key: string]: string }) => {
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
      return { success: false, error: data.message || "Login of admin failed" };
    }
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: "Admin login failed" + error,
    };
  }
};
