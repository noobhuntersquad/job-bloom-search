
import axios from "axios";

const API_URL = "http://localhost:3000/api";

interface RegisterRequest {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface ForgotPasswordRequest {
  email: string;
}

interface ResetPasswordRequest {
  token: string;
  password: string;
}

interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  plan: string;
  planExpiry?: string;
}

interface AuthResponse {
  token?: string;
  user?: User;
  message?: string;
}

class AuthService {
  setToken(token: string) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  clearToken() {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Registration failed");
      }
      throw new Error("Registration failed");
    }
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, data);
      if (response.data.token) {
        this.setToken(response.data.token);
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Login failed");
      }
      throw new Error("Login failed");
    }
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Request failed");
      }
      throw new Error("Password reset request failed");
    }
  }

  async resetPassword(data: ResetPasswordRequest): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Reset failed");
      }
      throw new Error("Password reset failed");
    }
  }

  logout() {
    this.clearToken();
  }
}

export default new AuthService();
