import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { api_url as API_BASE_URL } from "../utils/constants";

// Define the shape of our user object
interface User {
  id: string;
  email: string;
  name: string;
}

// Response interface for signup
interface SignupResponse {
  status: string;
  statusCode: number;
  message: string;
  data: any;
}

// Define the shape of our auth store
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    name: string,
    referredBy?: string,
    accountType?: string
  ) => Promise<SignupResponse>;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create the auth store
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Set loading state
      setLoading: (isLoading: boolean) => set({ isLoading }),

      // Set error message
      setError: (error: string | null) => set({ error }),

      // Login function
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          const response = await api.post("/auth/login", { email, password });

          set({
            user: response.data.user,
            token: response.data.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (err) {
          let errorMessage = "An unknown error occurred";

          if (axios.isAxiosError(err)) {
            errorMessage = err.response?.data?.message || "Login failed";
          } else if (err instanceof Error) {
            errorMessage = err.message;
          }

          set({ error: errorMessage, isLoading: false });
          throw err;
        }
      },

      // Signup function
      signup: async (
        email: string,
        password: string,
        name: string,
        referredBy?: string,
        accountType: string = "user"
      ) => {
        set({ isLoading: true, error: null });

        try {
          // Split name into first_name and last_name
          const nameParts = name.split(" ");
          const firstName = nameParts[0];
          const lastName =
            nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

          // Prepare request body according to API requirements
          const requestBody = {
            first_name: firstName,
            last_name: lastName,
            password,
            email,
            account_type: accountType,
          };

          // Add referred_by if provided
          if (referredBy) {
            Object.assign(requestBody, { referred_by: referredBy });
          }

          const response = await api.post("/auth/register", requestBody);

          // For successful registration with OTP flow
          if (response.data.status === "success") {
            // Just update loading state since we need verification
            set({
              isLoading: false,
              // Store email temporarily for verification
              user: { id: "", email, name: `${firstName} ${lastName}` } as User,
            });
          }
          localStorage.setItem("verificationEmail", email);
          localStorage.setItem("accountType", accountType);

          return response.data as SignupResponse;
        } catch (err) {
          let errorMessage = "An unknown error occurred";

          if (axios.isAxiosError(err)) {
            errorMessage = err.response?.data?.message || "Signup failed";
          } else if (err instanceof Error) {
            errorMessage = err.message;
          }

          set({ error: errorMessage, isLoading: false });
          throw err;
        }
      },

      // Logout function
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage", // name of the item in the storage
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
