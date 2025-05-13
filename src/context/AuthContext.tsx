
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import authService from "@/api/auth-service";

interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  plan: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const checkAuth = async () => {
    try {
      // This would typically make an API call to validate the token
      // and retrieve user data, but for now we'll just check if a token exists
      const token = authService.getToken();
      
      if (token) {
        // For demo purposes, we'll create a mock user when token exists
        // In a real app, you'd fetch the user data from a protected endpoint
        setUser({
          id: "user-123",
          username: "demouser",
          firstName: "Demo",
          lastName: "User",
          email: "demo@example.com",
          plan: "free"
        });
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      authService.clearToken();
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ username, password });
      if (response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any) => {
    setIsLoading(true);
    try {
      await authService.register(userData);
      // After registration, you might want to automatically log the user in,
      // or redirect them to the login page
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
