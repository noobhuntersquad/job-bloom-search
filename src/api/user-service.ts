
import axios from "axios";

const API_URL = "http://localhost:3000/api";

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  plan: string;
  planExpiry: string | null;
  emailNotifications: boolean;
}

export interface UpgradeRequest {
  planType: string;
}

class UserService {
  async getProfile(): Promise<UserProfile> {
    try {
      const response = await axios.get(`${API_URL}/user/profile`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Failed to get profile");
      }
      throw new Error("Failed to get user profile");
    }
  }

  async upgradePlan(data: UpgradeRequest): Promise<{ message: string; user: Partial<UserProfile> }> {
    try {
      const response = await axios.post(`${API_URL}/user/upgrade`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Failed to upgrade plan");
      }
      throw new Error("Failed to upgrade plan");
    }
  }
}

export default new UserService();
