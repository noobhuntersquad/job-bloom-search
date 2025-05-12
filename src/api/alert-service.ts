
import axios from "axios";

const API_URL = "http://localhost:3000/api";

export interface AlertCriteria {
  designation?: string;
  keywords?: string[];
  location?: string;
  exp_min?: number;
  exp_max?: number;
  sources?: string[];
}

export interface Alert {
  _id: string;
  name: string;
  criteria: AlertCriteria;
  frequency: string;
  active: boolean;
  lastSent?: string;
  createdAt: string;
}

export interface CreateAlertRequest {
  name: string;
  criteria: AlertCriteria;
  frequency: string;
}

class AlertService {
  async getAlerts(): Promise<Alert[]> {
    try {
      const response = await axios.get(`${API_URL}/alerts`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Failed to get alerts");
      }
      throw new Error("Failed to get alerts");
    }
  }

  async createAlert(data: CreateAlertRequest): Promise<Alert> {
    try {
      const response = await axios.post(`${API_URL}/alerts`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Failed to create alert");
      }
      throw new Error("Failed to create alert");
    }
  }

  async updateAlert(id: string, data: Partial<CreateAlertRequest>): Promise<Alert> {
    try {
      const response = await axios.put(`${API_URL}/alerts/${id}`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Failed to update alert");
      }
      throw new Error("Failed to update alert");
    }
  }

  async deleteAlert(id: string): Promise<{ message: string }> {
    try {
      const response = await axios.delete(`${API_URL}/alerts/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Failed to delete alert");
      }
      throw new Error("Failed to delete alert");
    }
  }
}

export default new AlertService();
