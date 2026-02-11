import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

// Get auth token from localStorage (Zustand persist storage)
const getAuthToken = () => {
  try {
    const authStorage = localStorage.getItem("auth-storage");
    if (authStorage) {
      const parsed = JSON.parse(authStorage);
      return parsed.state?.token || null;
    }
  } catch (error) {
    console.error("Error reading auth token:", error);
  }
  return null;
};

// Verify Paystack payment
export const verifyPayment = async (reference: string, requestId: string) => {
  const token = getAuthToken();
  const response = await axios.post(
    `${API_URL}/lendings/payments/verify`,
    { reference, requestId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
