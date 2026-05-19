import { ApiService, LoginRequest, LoginResponse } from './api.service';
import { StorageService } from './storage.service';

export class AuthService {
  /**
   * Realizar login
   */
  static async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const credentials: LoginRequest = {
        email_corporativo: email,
        password,
      };

      const response = await ApiService.login(credentials);

      // Guardar token y usuario
      await StorageService.saveToken(response.access_token);
      await StorageService.saveUser(response.user);

      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Realizar logout
   */
  static async logout(): Promise<void> {
    try {
      await StorageService.clearAll();
    } catch (error) {
      console.error('Error al hacer logout:', error);
      throw error;
    }
  }

  /**
   * Verificar si hay sesión activa
   */
  static async isAuthenticated(): Promise<boolean> {
    return await StorageService.hasActiveSession();
  }

  /**
   * Obtener usuario actual
   */
  static async getCurrentUser() {
    return await StorageService.getUser();
  }

  /**
   * Obtener token actual
   */
  static async getToken(): Promise<string | null> {
    return await StorageService.getToken();
  }
}
