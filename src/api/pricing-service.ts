
import axios from "axios";

const API_URL = "http://localhost:3000/api";

export interface PlanFeature {
  name: string;
}

export interface Plan {
  name: string;
  price: number;
  period?: string;
  features: string[];
}

export interface PricingResponse {
  plans: Plan[];
}

class PricingService {
  async getPlans(): Promise<PricingResponse> {
    try {
      const response = await axios.get(`${API_URL}/pricing`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Failed to get pricing plans");
      }
      throw new Error("Failed to get pricing plans");
    }
  }
}

export default new PricingService();
