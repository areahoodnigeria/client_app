import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios, { AxiosError } from "axios";
import { api_url as API_BASE_URL } from "../utils/constants";

// Define the shape of our user object
interface User {
  id: string;
  email: string;
  name: string;
  referral_code?: string;
  first_name?: string;
  last_name?: string;
  profile_picture?: string;
  location?: string;
  // neighbour or organization
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
  userType: "neighbour" | "organization" | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    name: string,
    referredBy?: string,
    accountType?: string,
    businessName?: string
  ) => Promise<SignupResponse>;
  // Password recovery
  forgotPassword: (email: string) => Promise<string>;
  resetPassword: (
    otp: string,
    password: string,
    accountType: string
  ) => Promise<string>;
  fetchUser: () => Promise<void>;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  getUserType: () => "neighbour" | "organization" | null;
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
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      userType: null,

      // Set loading state
      setLoading: (isLoading: boolean) => set({ isLoading }),

      // Set error message
      setError: (error: string | null) => set({ error }),

      // Login function
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          const response = await api.post("/auth/login", { email, password });

          // Derive user type from response (support various field names)
          const rawType =
            response.data.data?.user?.user_type ||
            response.data.data?.user?.account_type ||
            response.data.user_type ||
            response.data.account_type ||
            "user";

          console.log(response);

          const normalizedType =
            String(rawType).toLowerCase() === "organization"
              ? "organization"
              : "neighbour";

          set({
            user: response.data.user,
            token: response.data.data.token,
            isAuthenticated: true,
            isLoading: false,
            userType: normalizedType,
          });
          // Persist token to localStorage for interceptor usage
          try {
            if (response?.data?.data?.token) {
              localStorage.setItem("areaHoodToken", response.data.data.token);
            }
          } catch (_) {
            // no-op
          }
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
        accountType: string = "user",
        businessName?: string
      ) => {
        set({ isLoading: true, error: null });

        try {
          // Split name into first_name and last_name
          const nameParts = name.split(" ");
          const firstName = nameParts[0];
          const lastName =
            nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

          // Prepare request body according to API requirements
          const requestBody: Record<string, any> = {
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

          // Include business_name for organizations
          if (accountType === "organization" && businessName) {
            requestBody["business_name"] = businessName;
          }

          const response = await api.post("/auth/register", requestBody);

          // For successful registration with OTP flow
          if (response.data.status === "success") {
            // Just update loading state since we need verification
            set({
              isLoading: false,
              // Store email temporarily for verification
              user: { id: "", email, name: `${firstName} ${lastName}` } as User,
              userType:
                accountType === "organization" ? "organization" : "neighbour",
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

      // Forgot Password: request OTP
      forgotPassword: async (email: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.patch("/auth/forgot-password", { email });
          set({ isLoading: false });
          return response.data?.message || "OTP sent successfully";
        } catch (err) {
          let errorMessage = "An unknown error occurred";
          if (axios.isAxiosError(err)) {
            errorMessage = err.response?.data?.message || "Request failed";
          } else if (err instanceof Error) {
            errorMessage = err.message;
          }
          set({ error: errorMessage, isLoading: false });
          throw err;
        }
      },

      // Reset Password using OTP
      resetPassword: async (
        otp: string,
        password: string,
        accountType: string
      ) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.patch("/auth/reset-password", {
            otp,
            password,
            account_type: accountType,
          });
          set({ isLoading: false });
          return response.data?.message || "Password reset successfully";
        } catch (err) {
          let errorMessage = "An unknown error occurred";
          if (axios.isAxiosError(err)) {
            errorMessage = err.response?.data?.message || "Reset failed";
          } else if (err instanceof Error) {
            errorMessage = err.message;
          }
          set({ error: errorMessage, isLoading: false });
          throw err;
        }
      },

      // Fetch current user using protected endpoint
      fetchUser: async () => {
        console.log("response");
        set({ isLoading: true, error: null });
        try {
          const response = await api.get("/users/profile/me");
          console.log("response", response);

          const normalizedType = localStorage
            .getItem("auth-storage")
            ?.includes("organization")
            ? "organization"
            : "neighbour";

          set({
            user: {
              id: response.data.data._id,
              email: response.data.data.email,
              name: `${response.data.data.first_name} ${response.data.data.last_name}`,
              first_name: response.data.data.first_name,
              last_name: response.data.data.last_name,
              location:
                response.data.data.location.suburb ||
                response.data.data.location.city,
              profile_picture: response.data.data.profile_picture?.url,
              referral_code: response.data.data.referral?.referral_code,
            },
            isAuthenticated: true,
            isLoading: false,
            userType: normalizedType,
          });
        } catch (err) {
          let errorMessage = "An unknown error occurred";
          if (axios.isAxiosError(err)) {
            errorMessage =
              err.response?.data?.message || "Failed to fetch user";
          } else if (err instanceof Error) {
            errorMessage = err.message;
          }
          set({ error: errorMessage, isLoading: false });
          // If unauthorized, interceptor will handle logout
        }
      },

      // Logout function
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          userType: null,
        });
        // Clear stored auth artifacts
        try {
          localStorage.removeItem("areaHoodToken");
          localStorage.removeItem("auth-storage");
        } catch (_) {
          // no-op
        }
      },

      getUserType: () => get().userType,
    }),
    {
      name: "auth-storage", // name of the item in the storage
      partialize: (state) => ({
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        userType: state.userType,
      }),
    }
  )
);

// Attach axios interceptors for token and error handling
api.interceptors.request.use((config) => {
  try {
    const { token } = useAuthStore.getState();
    if (token) {
      if (config.headers) {
        const headers: any = config.headers as any;
        if (typeof headers.set === "function") {
          headers.set("Authorization", `Bearer ${token}`);
        } else {
          headers["Authorization"] = `Bearer ${token}`;
        }
      } else {
        // Initialize headers object without replacing AxiosHeaders instance
        config.headers = { Authorization: `Bearer ${token}` } as any;
      }
    }
  } catch (_) {
    // No-op
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      // Force logout on expired/invalid token
      try {
        useAuthStore.getState().logout();
      } catch (_) {
        // No-op
      }
    }
    return Promise.reject(error);
  }
);

export { api };

export default useAuthStore;
