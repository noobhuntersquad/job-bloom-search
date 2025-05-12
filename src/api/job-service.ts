
import axios from "axios";

const API_URL = "http://localhost:3000/api";

export interface JobSearchParams {
  designation?: string;
  keywords?: string;
  location?: string;
  exp_min?: number;
  exp_max?: number;
  sources?: string;
  page?: number;
  limit?: number;
}

export interface Job {
  jobId: string;
  jobTitle: string;
  companyName: string;
  companyLogoUrl: string;
  location: string;
  skills: string[];
  experienceRange: string;
  datePosted: string;
  jobUrl: string;
  description: string;
}

export interface Pagination {
  totalPages: number;
  currentPage: number;
  pages: number[];
}

export interface JobSearchResponse {
  results: Job[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  pagination: Pagination;
}

class JobService {
  async searchJobs(params: JobSearchParams): Promise<JobSearchResponse> {
    try {
      const response = await axios.get(`${API_URL}/jobs/search`, { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Job search failed");
      }
      throw new Error("Failed to search for jobs");
    }
  }
}

export default new JobService();
