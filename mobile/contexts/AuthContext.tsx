import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthService } from '../services/auth.service';

interface User {
  id: number;
  id_empleado: string;
  nombre_completo: string;
  email_corporativo: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar si hay sesión activa al iniciar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const hasSession = await AuthService.isAuthenticated();
        if (hasSession) {
          const currentUser = await AuthService.getCurrentUser();
          setUser(currentUser);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Error al verificar autenticación:', err);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await AuthService.login(email, password);
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (err: any) {
      const errorMsg = err.message || 'Error al iniciar sesión';
      setError(errorMsg);
      setIsAuthenticated(false);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await AuthService.logout();
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

/**
 * Hook para usar el contexto de autenticación
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
}
